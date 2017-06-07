/**
 * Created by manel on 31/5/17.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import {MenuController, NavController, NavParams} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../providers/ionic.service';
import { School } from '../../model/school';
import { CollectionCard } from "../../../../model/collectionCard";
import { UtilsService } from "../../../../providers/utils.service";

declare var google;

@Component({
  selector: 'page-create-collection',
  templateUrl: './create-collection.html'
})
export class CollectionCreate {

  @ViewChild('map') mapElement: ElementRef;
  public collectionCard: CollectionCard = new CollectionCard();

  constructor(
    public navController: NavController,
    public utilsService: UtilsService,
    public translateService: TranslateService) {

  }
  public createCollection(): void {
    alert(this.collectionCard.name+' / '+this.collectionCard.num+' / '+this.collectionCard.image);
  }
}
