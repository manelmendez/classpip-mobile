import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { LoginService } from '../../providers/login.service';
import { UtilsService } from '../../providers/utils.service';
import { MenuPage } from '../../pages/menu/menu';
import { Role } from '../../model/role';
import { Page } from '../../model/page';
import { Credentials } from '../../model/credentials';

@Component({
  selector: 'page-login',
  templateUrl: './login.html'
})
export class LoginPage {

  public credentials: Credentials = new Credentials();

  constructor(
    public navController: NavController,
    public loginService: LoginService,
    public utilsService: UtilsService,
    public translateService: TranslateService,
    public menuController: MenuController) {

    // TODO: remove this
    switch (utilsService.role) {
      case Role.STUDENT:
        break;
      case Role.TEACHER:
        this.credentials.username = 'teacher-1';
        this.credentials.password = 'teacher-1';
        break;
      case Role.SCHOOLADMIN:
        this.credentials.username = 'school-admin-1';
        this.credentials.password = 'school-admin-1';
        break;
      default:
        break;
    }

    this.menuController.enable(false);
  }

  /**
   * This method manages the call to the service for performing a login
   * against the public services
   */
  public login(): void {
    this.utilsService.showLoading(this.translateService.instant('APP.WAIT'));
    this.loginService.login(this.credentials).subscribe(
      response => {
        this.navController.setRoot(MenuPage)
      },
      error => {
        this.utilsService.removeLoading();
        this.utilsService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
  }

  /**
   * This method is used for navigate between pages. The page
   * to go is passed by parameter
   * @param {Page} page Page to display
   */
  public openPage(page: Page): void {
    this.navController.push(page.component);
  }

}
