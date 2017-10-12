import { Component, ViewChild, ElementRef } from '@angular/core';
import {Refresher, NavParams, NavController, ActionSheetController, AlertController} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import {Page} from "../../../model/page";
import {CollectionService} from "../../../../providers/collection.service";
import {CollectionCreate} from "./create-collection/create-collection";
import {IonicService} from "../../../../providers/ionic.service";
import {Card} from "../../../../model/card";
import {CardCreate} from "../create-card/create-card";
import {Profile} from "../../../../model/profile";
import {UserService} from "../../../../providers/user.service";
import {UtilsService} from "../../../../providers/utils.service";
import {CollectionCard} from "../../../../model/collectionCard";
import {CardEdit} from "../edit-card/edit-card";

declare let google;


@Component({
  selector: 'page-collection-teacher-detail',
  templateUrl: './collection-teacher-detail.html'
})
export class CollectionTeacherDetail {

  @ViewChild('map') mapElement: ElementRef;
  public cards: Array<Card>;
  public collectionCard: CollectionCard;
  public profile: Profile;

  constructor(
    public navParams: NavParams,
    public translateService: TranslateService,
    public utilsService: UtilsService,
    public collectionService: CollectionService,
    public userService: UserService,
    public ionicService: IonicService,
    public navController: NavController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController) {

    this.cards = this.navParams.data.cards;
    this.collectionCard = this.navParams.data.collectionCard;
  }

  /**
   * This method returns the collection list of the
   * current teacher
   * @param {Refresher} Refresher element
   */
  private getCollectionDetail(refresher?: Refresher): void {
    this.collectionService.getCollectionDetails(this.collectionCard.id).finally(() => {
      refresher ? refresher.complete() : null;
    }).subscribe(
      ((value: Array<Card>) => this.cards = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  private goToCreateCard() {
    this.userService.getMyProfile().subscribe(
      (value: Profile) => {
        this.profile = value;
        if (this.collectionCard.createdBy === this.profile.username) {
          this.navController.push(CardCreate, {id: this.collectionCard.id});
        }
        else {
          this.utilsService.presentToast('No crear carta en esta colección porque no es tuya');
        }
      });
  }

  public deleteCard(cardId) {

    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));
    this.collectionService.deleteCard(cardId).subscribe(
      response => {
        this.ionicService.removeLoading();
        this.utilsService.presentToast('Card deleted successfuly');
        this.getCollectionDetail();
      }, error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
  }

  public goToEditCard(card) {
    this.navController.push(CardEdit, {card:card});
  }

  public onHold(card){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecciona la acción',
      buttons: [
        {
          text: 'Borrar',
          role: 'destructive',
          handler: () => {
            this.userService.getMyProfile().subscribe(
              (value: Profile) => {
                this.profile = value;
                if (this.collectionCard.createdBy === this.profile.username) {
                  let confirm = this.alertCtrl.create({
                    title: 'Esta carta ha sido creada por ti',
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
                          this.deleteCard(card.id);
                        }
                      }
                    ]
                  });
                  confirm.present();
                }
                else {
                  this.utilsService.presentToast('No puedes borrar esta carta porque no ha sido creada por ti')
                }
              });
          }
        },
        {
          text: 'Editar',
          handler: () => {
            this.userService.getMyProfile().finally(()=>{
              if(this.collectionCard.createdBy===this.profile.username){
                this.goToEditCard(card);
              }
              else {
                this.utilsService.presentToast('No puedes editar esta carta porque no ha sido creada por ti')
              }
            }).subscribe(
              ((value: Profile) => this.profile = value),
            );
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
}
