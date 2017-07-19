/**
 * Created by manel on 3/5/17.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Refresher, NavParams, NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import {Page} from "../../../model/page";
import {CollectionService} from "../../../providers/collection.service";
import {CollectionCreate} from "./create-collection/create-collection";
import {CollectionCard} from "../../../model/collectionCard";
import {IonicService} from "../../../providers/ionic.service";
import {CollectionTeacherDetail} from "./collection-teacher-detail/collection-teacher-detail";
import {Card} from "../../../model/card";


declare var google;


@Component({
  selector: 'page-collection-teacher',
  templateUrl: './collection-teacher.html'
})
export class CollectionTpage {

  @ViewChild('map') mapElement: ElementRef;
  public collectionCreate: Page;
  public collectionCards: Array<CollectionCard>;
  public cards: Array<Card>;

  constructor(
    public navParams: NavParams,
    public translateService: TranslateService,
    public collectionService: CollectionService,
    public ionicService: IonicService,
    public navController: NavController) {

    this.collectionCreate = new Page(CollectionCreate, this.translateService.instant('CREATE-COLLECTION.TITLE'));
    this.collectionCards = this.navParams.data.collectionCards;
    this.cards = this.navParams.data.cards;

  }

  /**
   * This method returns the collection list of the
   * current teacher
   * @param {Refresher} Refresher element
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
   */
  public goToCollectionDetail(): void {
    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));

    this.collectionService.getCollectionDetails().subscribe(
      ((value: Array<Card>)=> this.navController.push(CollectionTeacherDetail, { cards: value })),
      error => {
        console.log(this.cards);
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

}
