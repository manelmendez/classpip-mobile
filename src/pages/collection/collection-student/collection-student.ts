import { Component, ViewChild, ElementRef } from '@angular/core';
import { Refresher, NavParams, NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import {Page} from "../../../model/page";
import {CollectionService} from "../../../providers/collection.service";
import {CollectionCreate} from "./create-collection/create-collection";
import {CollectionCard} from "../../../model/collectionCard";
import {IonicService} from "../../../providers/ionic.service";
import {CollectionStudentDetail} from "./collection-student-detail/collection-student-detail";
import {Card} from "../../../model/card";


declare var google;


@Component({
  selector: 'page-collection-student',
  templateUrl: './collection-student.html'
})
export class CollectionSpage {

  @ViewChild('map') mapElement: ElementRef;
  public collectionCards: Array<CollectionCard>;

  constructor(
    public navParams: NavParams,
    public translateService: TranslateService,
    public collectionService: CollectionService,
    public ionicService: IonicService,
    public navController: NavController) {

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
   * @param {Refresher} Refresher element
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
   */
  public goToCollectionDetail(id): void {
    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));

    this.collectionService.getCollectionDetails(id).subscribe(
      ((value: Array<Card>)=> this.navController.push(CollectionStudentDetail, { cards: value, id: id })),
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });


    this.ionicService.removeLoading();
  }
}
