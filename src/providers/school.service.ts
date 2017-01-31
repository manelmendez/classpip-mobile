import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../app/app.config';
import { UtilsService } from './utils.service';
import { School } from '../model/school';
import { Role } from '../model/role';
import { Avatar } from '../model/avatar';
import { Teacher } from '../model/teacher';
import { Student } from '../model/student';

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

    var url: string = this.utilsService.getMyUrl() + AppConfig.MYSCHOOL_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) => {
        let school: School = School.toObject(response.json())
        this.utilsService.currentSchool = school;
        return school;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
   * This method returns the list of teachers in the school of the
   * current logged in user
   * @return {Teachers} returns an array of teachers
   */
  public getMySchoolTeachers(): Observable<Array<Teacher>> {

    var count = 0;
    //let teachers: Teachers = new Teachers();

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    let url: string = this.utilsService.getMySchoolUrl() + AppConfig.TEACHERS_URL;

    return this.http.get(url, options)
      .flatMap((response: Response) =>
        Observable.forkJoin(Teacher.toObjectArray(response.json()).map(
          teacher => this.http.get(AppConfig.AVATARS_URL + '/' + teacher.avatarId, options)
            .map((response: Response, index: number) => {
              teacher.avatar = Avatar.toObject(response.json());
              return teacher;
            })
        ))
      ).catch((error: Response) => this.utilsService.handleAPIError(error));

    /*return this.http.get(url, options)
      .map((response: Response, index: number) => {
        // get the avatars of the teachers
        //for (let teacher of Teachers.toObject(response.json()).teacher) {
        Observable.forkJoin(Teachers.toObject(response.json()).teachers.map(
          teacher => this.http.get(AppConfig.AVATARS_URL + '/' + teacher.avatarId, options)
            .map((response: Response, index: number) => {
              console.log('avatar', response);
              teacher.avatar = Avatar.toObject(response.json());
              teachers.teachers.push(teacher);
              teachers.count++;
            })
        )).subscribe(teachers => {
          console.log('teachers', teachers);
          return teachers;
        });
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));*/
  }

  /**
   * This method returns the list of students in the school of the
   * current logged in user
   * @return {Teachers} returns an array of teachers
   */
  public getMySchoolStudents(): Observable<Array<Student>> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = this.utilsService.getMySchoolUrl() + AppConfig.STUDENTS_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) => Student.toObjectArray(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
   * This method returns the amount of teachers in the school of the
   * current logged in user
   * @return {Teachers} returns the number of teachers
   */
  public getMySchoolTeachersCount(): Observable<number> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = this.utilsService.getMySchoolUrl() + AppConfig.TEACHERS_URL + AppConfig.COUNT_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) => response.json().count)
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
   * This method returns the amount of students in the school of the
   * current logged in user
   * @return {number} returns the number of students
   */
  public getMySchoolStudentsCount(): Observable<number> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = this.utilsService.getMySchoolUrl() + AppConfig.STUDENTS_URL + AppConfig.COUNT_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) => response.json().count)
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

}
