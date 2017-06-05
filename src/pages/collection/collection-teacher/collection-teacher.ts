/**
 * Created by manel on 3/5/17.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../providers/ionic.service';
import { School } from '../../model/school';
import { CollectionCard } from "../../../model/collectionCard";

declare var google;

@Component({
  selector: 'page-collection-teacher',
  templateUrl: './collection-teacher.html'
})
export class CollectionTpage {

  @ViewChild('map') mapElement: ElementRef;
  private collectionCard: CollectionCard;

}
