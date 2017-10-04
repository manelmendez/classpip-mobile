/**
 * Created by manel on 31/5/17.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  ActionSheetController,
  Loading, LoadingController, NavController, NavParams,
  Platform
} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { School } from '../../model/school';
import { CollectionCard } from "../../../../model/collectionCard";
import { UtilsService } from "../../../../providers/utils.service";
import { Camera } from "@ionic-native/camera";
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import { CollectionService } from "../../../../providers/collection.service";
import {IonicService} from "../../../../providers/ionic.service";
import {Profile} from "../../../../model/profile";
import {Group} from "../../../../model/group";
import {AppConfig} from "../../../../app/app.config";
import {MenuPage} from "../../../menu/menu";
import {UserService} from "../../../../providers/user.service";
import {error} from "util";

declare let google;
declare let cordova;


@Component({
  selector: 'page-edit-collection',
  templateUrl: './edit-collection.html'
})
export class CollectionEdit {

  @ViewChild('map') mapElement: ElementRef;
  public collectionCard: CollectionCard = new CollectionCard();
  public collectionToPost: CollectionCard = new CollectionCard();
  lastImage: string = null;
  loading: Loading;
  public profile: Profile;
  public groups: Array<Group>;
  oldImage: string = null;


  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public utilsService: UtilsService,
    public collectionService: CollectionService,
    public translateService: TranslateService,
    public ionicService: IonicService,
    public userService: UserService,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public loadingCtrl: LoadingController
    ) {
    this.collectionCard = this.navParams.data.collectionCard;
    this.oldImage = this.collectionCard.image;
  }

  public editCollection(): void {
    if(this.oldImage===this.collectionCard.image){
      alert (this.oldImage);
      let dbpath = this.oldImage;
      try{
        this.putNewCollection(dbpath);
      }
      catch(error){
        alert(error);
      }
    }
    else{
      this.uploadImage();
    }
  }

  /**
   *
   * Modal that appears when clicking image input
   * Let user select between 2 sources {Library, Camera}
   *
   */
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * Take picture and select camera options
   * @param sourceType
   */
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    let options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.utilsService.presentToast('Error while selecting image : '+ err);
    });
  }
  // Create a new name for the image
  public createFileName() {
    let d = new Date(),
      n = d.getTime();

    return n + ".jpg";
  }

// Copy the image to a local folder
  public copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(success => {
        this.lastImage = newFileName;
        this.collectionCard.image=this.lastImage;
      }, error => {
        this.utilsService.presentToast('Error while storing file: '+ error);
      });
  }

  /**
   * Upload image to server
   *
   */
  public uploadImage() {
    // Returned String
    let imagePath= new String();

    // Destination URL
    let url = AppConfig.SERVER_URL+"/upload";
    // File for Upload
    let targetPath = this.pathForImage(this.lastImage);

    // File name only
    let filename = this.lastImage;

    let options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      params : {'fileName': filename}
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll();
      imagePath = data.response;
      let dbpath = AppConfig.SERVER_URL+imagePath;
      this.putNewCollection(dbpath);
    }, err => {
      this.loading.dismissAll();
      this.utilsService.presentToast('Error while uploading file: '+ err);
    });
  }
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  /**
   * This method send the new collection to
   * server and save it on DB
   * @param dbpath
   */
  public putNewCollection(dbpath): void {
    this.collectionToPost.name=this.collectionCard.name;
    this.collectionToPost.num=this.collectionCard.num;
    this.collectionToPost.image=dbpath;
    this.collectionToPost.id=this.collectionCard.id;
    this.userService.getMyProfile().finally(() => {
      this.collectionToPost.createdBy = this.profile.username;
      this.collectionService.editCollection(this.collectionToPost).subscribe(
        response => {
          this.utilsService.presentToast('Collection edited successfully');
          this.navController.setRoot(MenuPage);
        },
        error => {
          this.ionicService.removeLoading();
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        });
    }).subscribe(
      ((value: Profile) => this.profile = value)
    );
  }

}
