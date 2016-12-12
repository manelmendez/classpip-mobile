import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { LoginService } from '../../providers/login.service';
import { UtilsService } from '../../providers/utils.service';
import { MenuPage } from '../menu/menu';
import { Login } from '../../model/login.model';

@Component({
  selector: 'page-login',
  templateUrl: './login.html'
})
export class LoginPage {

  public loginCredentials: Login = new Login();

  constructor(
    public navController: NavController,
    public loginService: LoginService,
    public utilsService: UtilsService,
    public translateService: TranslateService,
    public menuController: MenuController) {

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

}
