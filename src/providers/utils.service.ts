import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Loading, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { AppConfig } from '../app/app.config';
import { ErrorResponse } from '../model/error.response.model';
import { Role } from '../model/role.model';

@Injectable()
export class UtilsService {

  public loading: Loading;
  private _role: Role;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public translateService: TranslateService) { }

  /**
   * Displays a loading mask into the screen
   * @param {string} message Message to display
   */
  public showLoading(message: string): void {

    // Remove the loading mask in case there is something
    this.removeLoading();

    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  /**
   * Remove the current loading mask from the screem
   */
  public removeLoading(): void {

    if (this.loading) {
      setTimeout(() => {
        this.loading.dismiss();
      });
    }
  }

  /**
   * Displays an alert message with a confirmation button
   * on the screen
   * @param {string} title Title of the alert
   * @param {string} message Message to display
   */
  public showAlert(title: string, message: string): void {

    this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [this.translateService.instant('APP.OK')]
    }).present(prompt);
  }

  /**
   * This method handles the bad responses of the backend
   * @param {Response} response Object with the server response
   * @return {Observable<Response>} Response with the error message
   */
  public handleAPIError(response: Response): Observable<Response> {

    let message: string = '';
    let error: ErrorResponse = ErrorResponse.toObject(response.json().error);
    console.error(error);

    switch (error.status) {
      case 401:
        if (error.code === AppConfig.LOGIN_FAILED) {
          message = this.translateService.instant('ERROR.LOGIN_FAILED');
        }
        else if (error.code === AppConfig.LOGIN_FAILED_EMAIL_NOT_VERIFIED) {
          message = this.translateService.instant('ERROR.LOGIN_FAILED_EMAIL_NOT_VERIFIED');
        } else {
          // Unauthorized request (login again)
          location.reload();
        }
        break;
      case 500:
        message = this.translateService.instant('ERROR.INTERNAL_ERROR') + error.message;
        break;
      default:
        message = error.message;
        break;
    }
    return Observable.throw(message);
  }

	public get role(): Role {
		return this._role;
	}

	public set role(value: Role) {
		this._role = value;
	}

}
