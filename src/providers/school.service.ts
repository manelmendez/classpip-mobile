import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../app';
import { UtilsService } from './utils.service';
import { School, Role } from '../model';

@Injectable()
export class SchoolService {

  constructor(
    public http: Http,
    public utilsService: UtilsService) { }

  /**
   * This method returns the current school of the logged
   * in user.
   * @return {Observable<Response>} returns an observable with the result
   * of the operation
   */
  public getMySchool(): Observable<School> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string;
    switch (this.utilsService.role) {
      case Role.STUDENT:
        url = AppConfig.STUDENT_URL + '/' + this.utilsService.currentUser.userId + AppConfig.SCHOOL_URL;
        break;
      case Role.TEACHER:
        url = AppConfig.TEACHER_URL + '/' + this.utilsService.currentUser.userId + AppConfig.SCHOOL_URL;
        break;
      case Role.SCHOOLADMIN:
        url = AppConfig.SCHOOLADMIN_URL + '/' + this.utilsService.currentUser.userId + AppConfig.SCHOOL_URL;
        break;
      default:
        break;
    }

    return this.http.get(url, options)
      .map((response: Response, index: number) => School.toObject(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

}
