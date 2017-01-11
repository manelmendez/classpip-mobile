import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { Page } from '../../model/page.model';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-role-select',
  templateUrl: './role-select.html'
})
export class RoleSelectPage {

  public loginPage: Page = new Page(LoginPage);

  constructor(
    public menuController: MenuController,
    public navController: NavController) {

    this.menuController.enable(false);
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
