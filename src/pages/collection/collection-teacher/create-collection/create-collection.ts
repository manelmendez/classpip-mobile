/**
 * Created by manel on 31/5/17.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  ActionSheetController, NavController,
  Platform
} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { School } from '../../model/school';
import { CollectionCard } from "../../../../model/collectionCard";
import { UtilsService } from "../../../../providers/utils.service";
import { CollectionService } from "../../../../providers/collection.service";
import { Camera } from "@ionic-native/camera";
import {IonicService} from "../../../../providers/ionic.service";
import {MenuPage} from "../../../menu/menu";
import {UserService} from "../../../../providers/user.service";
import {Profile} from "../../../../model/profile";
import {UploadImageService} from "../../../../providers/uploadImage.service";

declare let google;
declare let cordova;


@Component({
  selector: 'page-create-collection',
  templateUrl: './create-collection.html'
})
export class CollectionCreate {

  @ViewChild('map') mapElement: ElementRef;
  public collectionCard: CollectionCard = new CollectionCard();
  public collectionToPost: CollectionCard = new CollectionCard();
  public profile: Profile;


  constructor(
    public navController: NavController,
    public utilsService: UtilsService,
    public collectionService: CollectionService,
    public uploadImageService: UploadImageService,
    public translateService: TranslateService,
    public ionicService: IonicService,
    public userService: UserService,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform) {

  }
  public createCollection(): void {
    this.uploadImageService.uploadImage(this.collectionCard.image);
    this.postNewCollection(this.collectionCard.image);
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
              this.collectionCard.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY)
            }
          },
          {
            text: 'Use Camera',
            handler: () => {
              this.collectionCard.image=this.uploadImageService.takePicture(this.camera.PictureSourceType.CAMERA)
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
   * This method send the new collection to
   * server and save it on DB
   * @param dbpath
   */
  private postNewCollection(dbpath): void {
    this.collectionToPost.name=this.collectionCard.name;
    this.collectionToPost.num=this.collectionCard.num;
    this.collectionToPost.image=dbpath;
    this.userService.getMyProfile().finally(() => {
      this.collectionToPost.createdBy = this.profile.username;
      this.collectionService.postCollection(this.collectionToPost).subscribe(
        response => {
          this.utilsService.presentToast('Collection created successfully');
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
