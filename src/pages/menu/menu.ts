import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { LoginService } from '../../providers/login.service';
import { Page } from '../../model/page.model';

@Component({
  selector: 'page-menu',
  templateUrl: './menu.html'
})
export class MenuPage {

  @ViewChild(Nav) nav: Nav;

  public rootPage: Component;
  public pages: Array<Page>;

  constructor(
    public navCtrl: NavController,
    private loginService: LoginService) {

    this.rootPage = HomePage;
    this.pages = [
      new Page('Home', HomePage)
    ];
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
    this.loginService.logout().subscribe(success => {
      this.nav.setRoot(LoginPage)
    });
  }

}
