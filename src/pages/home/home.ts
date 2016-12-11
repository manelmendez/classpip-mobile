import { Component } from '@angular/core';

import { LoginService } from '../../providers/login.service';
import { LoginResponse } from '../../model/login.response.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user: LoginResponse;

  constructor(public loginService: LoginService) {

    this.user = loginService.getUserInfo();
  }
}
