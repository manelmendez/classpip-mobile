/**
 * Created by manel on 31/5/17.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  Loading, NavController, NavParams,
  Platform
} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import {CollectionCard} from "../../../../../model/collectionCard";
import {Student} from "../../../../../model/student";
import {UtilsService} from "../../../../../providers/utils.service";
import {CollectionService} from "../../../../../providers/collection.service";
import {IonicService} from "../../../../../providers/ionic.service";
import {Card} from "../../../../../model/card";
import {MenuPage} from "../../../../menu/menu";
import {CollectionTpage} from "../../collection-teacher";



declare let google;
declare let cordova;


@Component({
  selector: 'page-assign-card-student',
  templateUrl: './assign-card-student.html'
})
export class CardAssignStudent {

  @ViewChild('map') mapElement: ElementRef;
  public collectionCard: CollectionCard = new CollectionCard();
  public card: Card = new Card();
  loading: Loading;
  public students: Array<Student>;
  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public utilsService: UtilsService,
    public collectionService: CollectionService,
    public translateService: TranslateService,
    public ionicService: IonicService,
    public platform: Platform,
    ) {

    this.collectionCard.id = this.navParams.data.id;
    this.students = this.navParams.data.students;
    this.card.id = this.navParams.data.cardId;
  }

  public assignCardToStudents(studentId) {
    this.collectionService.assignCardToStudent(studentId,this.card.id).subscribe(response => {
      this.utilsService.presentToast('Card assigned to student successfuly');
      this.navController.setRoot(MenuPage).then(()=>{
      this.navController.push(CollectionTpage);
    });
  },
  error => {
  this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
});
  }
}
