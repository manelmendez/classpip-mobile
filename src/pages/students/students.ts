import { Component } from '@angular/core';
import { Refresher, Platform, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { UtilsService } from '../../providers/utils.service';
import { SchoolService } from '../../providers/school.service';
import { Student } from '../../model/student';
import { StudentPage } from './student/student';

@Component({
  selector: 'page-students',
  templateUrl: './students.html'
})
export class StudentsPage {

  public students: Array<Student>;

  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public utilsService: UtilsService,
    public schoolService: SchoolService,
    public translateService: TranslateService) {

    this.students = this.navParams.data.students;
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {

    this.utilsService.removeLoading();
  }

  /**
   * This method returns the students list of the
   * current school
   * @param {Refresher} Refresher element
   */
  private getStudents(refresher?: Refresher): void {

    this.schoolService.getMySchoolStudents().finally(() => {
      refresher ? refresher.complete() : null;
    }).subscribe(
      ((value: Array<Student>) => this.students = value),
      error => this.utilsService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  /**
   * Method called from the home page to open the list of the
   * students of the school of the current user
   */
  public goToStudentDetail(student: Student): void {
    this.navController.push(StudentPage, { student: student })
  }
}
