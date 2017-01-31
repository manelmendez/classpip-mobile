import { Component } from '@angular/core';
import { Refresher, Platform, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { UtilsService } from '../../../providers/utils.service';
import { Teacher } from '../../../model/teacher';

@Component({
  selector: 'page-teacher',
  templateUrl: './teacher.html'
})
export class TeacherPage {

  public teacher: Teacher;

  constructor(
    public navParams: NavParams,
    public utilsService: UtilsService,
    public translateService: TranslateService) {

    this.teacher = this.navParams.data.teacher;
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
  }
}
