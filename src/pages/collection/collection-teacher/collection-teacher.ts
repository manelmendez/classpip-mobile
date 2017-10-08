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
import {CollectionEdit} from "./edit-collection/edit-collection";
import {CollectionsAssigned} from "./assigned-collections/assigned-collections";
import {MatterService} from "../../../providers/matter.service";
import {GradeService} from "../../../providers/grade.service";


declare let google;


@Component({
  selector: 'page-collection-teacher',
  templateUrl: './collection-teacher.html'
})
export class CollectionTpage {

  @ViewChild('map') mapElement: ElementRef;
  public collectionCards: Array<CollectionCard>;
  public assignedGroups: Array<Group>;
  public allGroups: Array<Group>;
  public boolean: boolean;
  public profile: Profile;

  constructor(
    public navParams: NavParams,
    public translateService: TranslateService,
    public utilsService: UtilsService,
    public collectionService: CollectionService,
    public userService: UserService,
    public groupService: GroupService,
    public gradeService: GradeService,
    public matterService: MatterService,
    public ionicService: IonicService,
    public navController: NavController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
  ) {

  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {

    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));

    this.getCollections();
  }

  /**
   * This method returns the collection list of the
   * current teacher
   * @param {Refresher} refresher Refresher
   */

  private getCollections(refresher?: Refresher): void {
    this.collectionService.getMyCollections().finally(() => {
      refresher ? refresher.complete() : null;
      this.ionicService.removeLoading();
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
   *
   * @param collectionId
   */
  public goToAssignCollection(collectionId): void {
    //first of all, get all previous assigned groups to that collection
    this.collectionService.getAssignedGroups(collectionId).finally(()=>{
      //compare that assigned groups with all groups to show only the NON assigned groups
      this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));
      let groupArray = Array<Group>();
      this.groupService.getMyGroups().subscribe(
        ((value: Array<Group>) =>  {
          this.allGroups = value;
          for (let i=0;i<this.allGroups.length;i++) {
            let exists: boolean = false;
            for (let j = 0; j < this.assignedGroups.length; j++) {
              if (this.allGroups[i].id === this.assignedGroups[j].id) {
                exists = true;
                break;
              }
            }
            if (!exists) {
              groupArray.push(this.allGroups[i]);
            }
          }
          this.navController.push(CollectionAssign, { groups: groupArray, id: collectionId })
        }),
        error => {
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        });
      this.ionicService.removeLoading();
    }).subscribe(
      ((value: Array<Group>) => this.assignedGroups = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error)
    );

  }

  public goToAssignedCollections(collectionId): void {
    let groupArray = Array<Group>();
    //first of all, get all previous assigned groups to that collection
    this.collectionService.getAssignedGroups(collectionId).finally(()=>{
      //now get all parameters inside group
      this.assignedGroups.forEach(group => {
        this.gradeService.getGrade(group.gradeId).subscribe(
          grade => {
            group.grade = grade;
            this.matterService.getMatter(group.matterId).subscribe(
              matter => {
                group.matter = matter;
                groupArray.push(group);
                if (groupArray.length === this.assignedGroups.length) {
                  this.navController.push(CollectionsAssigned, { groups: groupArray, id: collectionId })
                }
              })
          })
      });
    }).subscribe(
      ((value: Array<Group>) => {
        this.assignedGroups=value;
      }),
        error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error)
    );
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

  public goToEditCollection(collectionCard) {
    this.navController.push(CollectionEdit, {collectionCard:collectionCard});
  }


  public onHold(collectionCard){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecciona la acción',
      buttons: [
        {
          text: 'Borrar',
          role: 'destructive',
          handler: () => {
            this.selectDelete(collectionCard);
          }
        },
        {
          text: 'Asignar a un grupo',
          handler: () => {
            this.goToAssignCollection(collectionCard.id);
          }
        },
        {
          text: 'Gestionar grupos asignados',
          handler: () => {
            this.goToAssignedCollections(collectionCard.id);
          }
        },
        {
          text: 'Editar',
          handler: () => {
            this.userService.getMyProfile().finally(()=>{
              if(collectionCard.createdBy===this.profile.username){
                this.goToEditCollection(collectionCard);
              }
              else {
                this.utilsService.presentToast('No puedes editar esta colección porque no ha sido creada por ti')
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
