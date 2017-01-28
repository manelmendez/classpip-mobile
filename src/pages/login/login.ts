import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { LoginService } from '../../providers/login.service';
import { UtilsService } from '../../providers/utils.service';
import { MenuPage } from '../menu/menu';
import { Role } from '../../model/role.model';
import { Login } from '../../model/login.model';
import { Page } from '../../model/page.model';

@Component({
  selector: 'page-login',
  templateUrl: './login.html'
})
export class LoginPage {

  public loginCredentials: Login = new Login();
  private role: Role;

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
        this.loginCredentials.username = 'teacher-1';
        this.loginCredentials.password = 'teacher-1';
        break;
      case Role.SCHOOLADMIN:
        this.loginCredentials.username = 'school-admin-1';
        this.loginCredentials.password = 'school-admin-1';
        break;
      default:
        console.error('There is no role defined for this: ', this.role);
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
    this.loginService.login(this.loginCredentials).subscribe(
      response => {
        this.utilsService.removeLoading();
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
