/**
 * Created by manel on 3/5/17.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import {Refresher, NavParams, NavController, ActionSheetController, AlertController} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import {CollectionService} from "../../../providers/collection.service";
import {GroupService} from "../../../providers/group.service";
import {CollectionCreate} from "./create-collection/create-collection";
import {CollectionCard} from "../../../model/collectionCard";
import {IonicService} from "../../../providers/ionic.service";
import {CollectionTeacherDetail} from "./collection-teacher-detail/collection-teacher-detail";
import {Card} from "../../../model/card";
import {CollectionAssign} from "./assign-collection/assign-collection";
import {Group} from "../../../model/group";
import {UtilsService} from "../../../providers/utils.service";
import {Profile} from "../../../model/profile";
import {UserService} from "../../../providers/user.service";
import {MenuPage} from "../../menu/menu";


declare let google;


@Component({
  selector: 'page-collection-teacher',
  templateUrl: './collection-teacher.html'
})
export class CollectionTpage {

  @ViewChild('map') mapElement: ElementRef;
  public collectionCards: Array<CollectionCard>;
  public boolean: boolean;
  public profile: Profile;

  constructor(
    public navParams: NavParams,
    public translateService: TranslateService,
    public utilsService: UtilsService,
    public collectionService: CollectionService,
    public userService: UserService,
    public groupService: GroupService,
    public ionicService: IonicService,
    public navController: NavController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
  ) {

    this.collectionCards = this.navParams.data.collectionCards;
  }

  /**
   * This method returns the collection list of the
   * current teacher
   * @param {Refresher} refresher Refresher
   */

  private getCollections(refresher?: Refresher): void {
    this.collectionService.getMyCollections().finally(() => {
      refresher ? refresher.complete() : null;
    }).subscribe(
      ((value: Array<CollectionCard>) => this.collectionCards = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  /**
   * Method called from the collections page to open the list of the
   * cards of the current collection
   *
   * @param id
   */
  public goToCollectionDetail(id): void {
    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));

    this.collectionService.getCollectionDetails(id).subscribe(
      ((value: Array<Card>)=> this.navController.push(CollectionTeacherDetail, { cards: value, id: id })),
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });


    this.ionicService.removeLoading();
  }

  /**
   * Method called to open the page to create-collection
   * new collections
   */
  public goToCreate(): void {
    this.navController.push(CollectionCreate);
  }

  /**
   * Method called from the collections page to open the list of the
   * cards of the current collection
   */
  public goToAssignCollection(collectionId): void {
    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));

    this.groupService.getMyGroups().subscribe(
      ((value: Array<Group>)=> this.navController.push(CollectionAssign, { groups: value, id: collectionId })),
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });


    this.ionicService.removeLoading();
  }


  public selectDelete(collectionCard): void {
    this.userService.getMyProfile().subscribe(
      ((value: Profile) => this.profile = value),
    );
    if(collectionCard.createdBy===this.profile.username){
      let confirm = this.alertCtrl.create({
        title: 'Esta colección ha sido creada por ti',
        message: 'Si la borras se eliminará completamente, estás de acuerdo?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {

            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              this.boolean=true;
              this.deleteCollection(collectionCard.id);
            }
          }
        ]
      });
      confirm.present();
    }
    else {
      let confirm = this.alertCtrl.create({
        title: 'Esta colección NO ha sido creada por ti',
        message: 'Estás seguro que deseas borrarla de tus colecciones?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {

            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              this.boolean=false;
              this.deleteCollection(collectionCard.id);
            }
          }
        ]
      });
      confirm.present();
    }

  }
  public deleteCollection(collectionId) {
    if (this.boolean==true){
      this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));

      this.collectionService.deleteCollection(collectionId).subscribe(
        response => {
          this.ionicService.removeLoading();
          this.utilsService.presentToast('Collection deleted successfuly');
          this.getCollections();
        }, error => {
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        });
    }
    else{
      this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));

      this.collectionService.deleteCollectionRelation(collectionId).subscribe(
        response => {
          this.ionicService.removeLoading();
          this.utilsService.presentToast('Collection successfuly removed from your list');
          this.getCollections();
        }, error => {
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        });
    }
  }



  public onHold(collectionCard){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Action',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.selectDelete(collectionCard);
          }
        },
        {
          text: 'Assign to group',
          handler: () => {
            this.goToAssignCollection(collectionCard.id);
          }
        },
        {
          text: 'Edit',
          handler: () => {

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
}
