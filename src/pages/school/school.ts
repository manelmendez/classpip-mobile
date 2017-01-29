import { Component } from '@angular/core';
import { NavParams, Platform } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarker } from 'ionic-native';

import { UtilsService } from '../../providers/utils.service';
import { School } from '../../model';

@Component({
  selector: 'page-school',
  templateUrl: './school.html'
})
export class SchoolPage {

  public school: School;

  constructor(
    public navParams: NavParams,
    public platform: Platform,
    public translateService: TranslateService,
    public utilsService: UtilsService) {

    this.school = this.navParams.data.school;
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
  }

  /**
   * Load map only after view is initialize
   */
  public ngAfterViewInit(): void {
    if (this.platform.is('cordova')) {
      let map = new GoogleMap(document.getElementById('map'));

      // listen to MAP_READY event
      map.one(GoogleMapsEvent.MAP_READY).then(() => {

        this.utilsService.removeLoading();

        // move the map's camera to position
        map.moveCamera({
          target: new GoogleMapsLatLng(this.school.latitude, this.school.longitude),
          zoom: 18,
          tilt: 30
        }).then(() => {

          // add a marker on the school
          map.addMarker({
            position: new GoogleMapsLatLng(this.school.latitude, this.school.longitude),
            title: this.school.name,
            snippet: this.school.address + ' ' + this.school.zipCode + '\n' + this.school.city + ' ' + this.school.country
          }).then((marker: GoogleMapsMarker) => {

            // show the marker tooltip
            marker.showInfoWindow();
          }).catch((error) => {
            this.utilsService.showAlert(this.translateService.instant('APP.ERROR'), error);
          });
        }).catch((error) => {
          this.utilsService.showAlert(this.translateService.instant('APP.ERROR'), error);
        });
      }).catch((error) => {
        this.utilsService.showAlert(this.translateService.instant('APP.ERROR'), error);
      })
    } else {
      this.utilsService.removeLoading();
    }
  }

}
