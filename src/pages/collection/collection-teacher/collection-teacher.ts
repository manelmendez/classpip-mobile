/**
 * Created by manel on 3/5/17.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../providers/ionic.service';
import { CollectionService } from "../../providers/collection.service";
import { School } from '../../model/school';
import { Collection } from "../../../model/collection";
import { CollectionCreate } from "../collection-teacher/create-collection/create-collection";
import { Page } from "../../../model/page";

declare var google;


@Component({
  selector: 'page-collection-teacher',
  templateUrl: './collection-teacher.html'
})
export class CollectionTpage {

  @ViewChild('map') mapElement: ElementRef;
  private collection: Collection;
  public collectionCreate: Page;
  constructor(
    public translateService: TranslateService,
    public navController: NavController) {

    this.collectionCreate = new Page(CollectionCreate, this.translateService.instant('CREATE-COLLECTION.TITLE'));
  }
  /**
   * Method called to open the page to create-collection
   * new collections
   */

  public goToCreate(): void {
    this.navController.push(CollectionCreate);
  }

}
