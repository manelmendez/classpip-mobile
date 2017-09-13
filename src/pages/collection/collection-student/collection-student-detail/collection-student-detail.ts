import { Component, ViewChild, ElementRef } from '@angular/core';
import { Refresher, NavParams, NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import {Page} from "../../../model/page";
import {CollectionService} from "../../../../providers/collection.service";
import {CollectionCreate} from "./create-collection/create-collection";
import {CollectionCard} from "../../../model/collectionCard";
import {IonicService} from "../../../../providers/ionic.service";
import {Card} from "../../../../model/card";


declare var google;


@Component({
  selector: 'page-collection-student-detail',
  templateUrl: './collection-student-detail.html'
})
export class CollectionStudentDetail {

  @ViewChild('map') mapElement: ElementRef;
  public cards: Array<Card>;
  public id: string;
  constructor(
    public navParams: NavParams,
    public translateService: TranslateService,
    public collectionService: CollectionService,
    public ionicService: IonicService,
    public navController: NavController) {

    this.cards = this.navParams.data.cards;
    this.id = this.navParams.data.id;
  }

  /**
   * This method returns the collection list of the
   * current teacher
   * @param {Refresher} Refresher element
   */
  private getCollectionDetail(refresher?: Refresher): void {
    this.collectionService.getCollectionDetails(this.id).finally(() => {
      refresher ? refresher.complete() : null;
    }).subscribe(
      ((value: Array<Card>) => this.cards = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }
}
