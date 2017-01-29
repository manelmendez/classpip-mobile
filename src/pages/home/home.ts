import { Component } from '@angular/core';
import { MenuController, Refresher, NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { UtilsService } from '../../providers/utils.service';
import { LoginService } from '../../providers/login.service';
import { SchoolService } from '../../providers/school.service';
import { School } from '../../model';
import { SchoolPage } from '../../pages';

@Component({
  selector: 'page-home',
  templateUrl: './home.html'
})
export class HomePage {

  public school: School;

  constructor(
    public loginService: LoginService,
    public utilsService: UtilsService,
    public translateService: TranslateService,
    public schoolService: SchoolService,
    public menuController: MenuController,
    public navController: NavController) {
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {

    this.menuController.enable(true);
    this.utilsService.showLoading(this.translateService.instant('APP.WAIT'));

    this.getSchoolInfo();
  }

  /**
   * This method returns the school information from the
   * backend. This call is called on the constructor or the
   * refresh event
   * @param {Refresher} Refresher element
   */
  private getSchoolInfo(refresher?: Refresher): void {

    this.schoolService.getMySchool().finally(() => {
      refresher ? refresher.complete() : null;
      this.utilsService.removeLoading();
    }).subscribe(
      ((value: School) => this.school = value),
      error => this.utilsService.showAlert('ERROR', error));
  }

  /**
   * Method called from the home page to open the details of the
   * school of the current user
   * @param {School} school to open
   */
  public goToSchool(): void {

    this.utilsService.showLoading(this.translateService.instant('APP.WAIT'));

    this.schoolService.getMySchool().subscribe(
      ((value: School) => this.navController.push(SchoolPage, { school: value })),
      error => {
        this.utilsService.showAlert('ERROR', error);
        this.utilsService.removeLoading();
      });
  }
}
