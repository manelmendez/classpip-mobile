import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../app';
import { UtilsService } from './utils.service';
import { Profile, Role, Avatar } from '../model';

@Injectable()
export class UserService {

  constructor(
    public http: Http,
    public utilsService: UtilsService) { }

  /**
   * This method returns the profile information of the current logged
   * in user on the platform
   * @return {Observable<Profile>} returns an observable with the profile
   */
  public getMyProfile(): Observable<Profile> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string;
    switch (this.utilsService.role) {
      case Role.STUDENT:
        url = AppConfig.STUDENT_URL + '/' + this.utilsService.currentUser.userId;
        break;
      case Role.TEACHER:
        url = AppConfig.TEACHER_URL + '/' + this.utilsService.currentUser.userId;
        break;
      case Role.SCHOOLADMIN:
        url = AppConfig.SCHOOLADMIN_URL + '/' + this.utilsService.currentUser.userId;
        break;
      default:
        break;
    }

    return this.http.get(url, options)
      .map((response: Response, index: number) => Profile.toObject(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
   * This method returns the profile information of the current logged
   * in user on the platform
   * @return {Observable<Profile>} returns an observable with the profile
   */
  public getMyAvatar(): Observable<Avatar> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string;
    switch (this.utilsService.role) {
      case Role.STUDENT:
        url = AppConfig.STUDENT_URL + '/' + this.utilsService.currentUser.userId + AppConfig.AVATAR_URL;
        break;
      case Role.TEACHER:
        url = AppConfig.TEACHER_URL + '/' + this.utilsService.currentUser.userId + AppConfig.AVATAR_URL;
        break;
      case Role.SCHOOLADMIN:
        url = AppConfig.SCHOOLADMIN_URL + '/' + this.utilsService.currentUser.userId + AppConfig.AVATAR_URL;
        break;
      default:
        break;
    }

    return this.http.get(url, options)
      .map((response: Response, index: number) => Avatar.toObject(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

}
