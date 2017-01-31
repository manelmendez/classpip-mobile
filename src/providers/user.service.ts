import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../app/app.config';
import { UtilsService } from './utils.service';
import { Profile } from '../model/profile';
import { Role } from '../model/role';
import { Avatar } from '../model/avatar';

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

    var url: string = this.utilsService.getMyUrl();

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

    var url: string = this.utilsService.getMyUrl() + AppConfig.AVATAR_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) => Avatar.toObject(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

}
