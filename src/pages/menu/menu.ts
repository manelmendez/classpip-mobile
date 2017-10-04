import { Component, ViewChild } from '@angular/core';
import {NavController, Nav, NavParams} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../providers/ionic.service';
import { UtilsService } from '../../providers/utils.service';
import { LoginService } from '../../providers/login.service';
import { SchoolService } from '../../providers/school.service';
import {CollectionService} from "../../providers/collection.service";
import { RoleSelectPage } from '../../pages/role-select/role-select';
import { HomePage } from '../../pages/home/home';
import { SchoolPage } from '../../pages/school/school';
import { ProfilePage } from '../../pages/profile/profile';
import {CollectionTpage} from "../collection/collection-teacher/collection-teacher";
import {CollectionSpage} from "../collection/collection-student/collection-student";
import { Page } from '../../model/page';
import { School } from '../../model/school';
import {CollectionCard} from "../../model/collectionCard";
import {Role} from "../../model/role";

@Component({
  selector: 'page-menu',
  templateUrl: './menu.html'
})
export class MenuPage {

  @ViewChild(Nav) nav: Nav;

  public rootPage: Component;
  public homePage: Page;
  public schoolPage: Page;
  public collectionTpage: Page;
  public collectionSpage: Page;
  public collectionCards: Array<CollectionCard>;
  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public translateService: TranslateService,
    public utilsService: UtilsService,
    public ionicService: IonicService,
    public schoolService: SchoolService,
    public collectionService: CollectionService,
    private loginService: LoginService) {

    this.rootPage = HomePage;
    this.homePage = new Page(HomePage, this.translateService.instant('HOME.TITLE'));
    this.schoolPage = new Page(SchoolPage, this.translateService.instant('SCHOOL.TITLE'));
    this.collectionTpage = new Page(CollectionTpage, this.translateService.instant('COLLECTION.TITLE'));
    this.collectionSpage = new Page(CollectionSpage, this.translateService.instant('COLLECTION.TITLE'));
    this.collectionCards = this.navParams.data.collectionCards;
  }
  /**
   * Method for opening a page
   * @param {Page} page Page to open
   */
  public openPage(page: Page): void {
    this.nav.setRoot(page.component);
  }

  /**
   * Method for calling the logout service
   */
  public logout(): void {
    this.loginService.logout().subscribe(
      success => this.nav.setRoot(RoleSelectPage),
      error => location.reload());
  }

  /**
   * Method for displaying the profile page
   */
  public showProfile(): void {
    this.navController.push(ProfilePage);
  }

  /**
   * Method called from the home page to open the details of the
   * school of the current user
   * @param {School} school to open
   */
  public goToSchool(): void {

    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));

    this.schoolService.getMySchool().subscribe(
      ((value: School) => this.navController.push(SchoolPage, { school: value })),
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
    this.ionicService.removeLoading();

  }
  /**
   * Method for displaying the collection page
   */
  public showCollection(): void {
    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));
    //var regexp = /teachers/gi;
    //if(this.utilsService.getMyUrl().search(regexp) >= 0) {
    if(this.utilsService.role === Role.TEACHER) {
      this.collectionService.getMyCollections().subscribe(
        ((value: Array<CollectionCard>)=> this.navController.push(CollectionTpage, { collectionCards: value })),
        error => {
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        });

    } else {

      this.collectionService.getMyCollections().subscribe(
        ((value: Array<CollectionCard>)=> this.navController.push(CollectionSpage, { collectionCards: value })),
        error => {
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
        });

    }

    this.ionicService.removeLoading();
  }
}
