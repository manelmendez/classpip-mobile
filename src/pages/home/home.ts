import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';

import { LoginService } from '../../providers/login.service';
import { LoginResponse } from '../../model/login.response.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user: LoginResponse;

  constructor(
    public loginService: LoginService,
    public menuController: MenuController) {

    this.menuController.enable(true);
    this.user = loginService.getUserInfo();
  }
}
