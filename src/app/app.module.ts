import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

// application
import { MyApp } from './app.component';
import { AppConfig } from './app.config';

// pages
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { HomePage } from '../pages/home/home';
import { RoleSelectPage } from '../pages/role-select/role-select';
import { SchoolPage } from '../pages/school/school';
import { PopoverPage } from '../pages/home/popover/popover';
import { ProfilePage } from '../pages/profile/profile';
import { TermsPage } from '../pages/profile/terms/terms';
import { HelpPage } from '../pages/profile/help/help';
import { TeachersPage } from '../pages/teachers/teachers';
import { TeacherPage } from '../pages/teachers/teacher/teacher';
import { StudentsPage } from '../pages/students/students';
import { StudentPage } from '../pages/students/student/student';
import { GroupPage } from '../pages/group/group';
import { CollectionTpage } from "../pages/collection/collection-teacher/collection-teacher";
import { CollectionCreate } from "../pages/collection/collection-teacher/create-collection/create-collection";
import { CollectionTeacherDetail } from "../pages/collection/collection-teacher/collection-teacher-detail/collection-teacher-detail";
import { CollectionSpage } from "../pages/collection/collection-student/collection-student";
import { CollectionStudentDetail } from "../pages/collection/collection-student/collection-student-detail/collection-student-detail";

// pipes
import { OrderByIdPipe } from '../pipes/order-by-id.pipe';
import { OrderByNamePipe } from '../pipes/order-by-name.pipe';
import { OrderBySurnamePipe } from '../pipes/order-by-surname.pipe';

// services
import { IonicService } from '../providers/ionic.service';
import { HockeyAppService } from '../providers/hockeyapp.service';
import { AvatarService } from '../providers/avatar.service';
import { GradeService } from '../providers/grade.service';
import { GroupService } from '../providers/group.service';
import { LoginService } from '../providers/login.service';
import { MatterService } from '../providers/matter.service';
import { SchoolService } from '../providers/school.service';
import { UserService } from '../providers/user.service';
import { UtilsService } from '../providers/utils.service';
import { CollectionService } from "../providers/collection.service";

// rxjs
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';

export function exportTranslateStaticLoader(http: Http) {
  return new TranslateStaticLoader(http, AppConfig.LANG_PATH, AppConfig.LANG_EXT);
}

@NgModule({
  declarations: [
    // pages
    MyApp,
    LoginPage,
    MenuPage,
    HomePage,
    RoleSelectPage,
    SchoolPage,
    PopoverPage,
    ProfilePage,
    TermsPage,
    HelpPage,
    TeachersPage,
    TeacherPage,
    StudentsPage,
    StudentPage,
    GroupPage,
    CollectionTpage,
    CollectionCreate,
    CollectionTeacherDetail,
    CollectionSpage,
    CollectionStudentDetail,
    // pipes
    OrderByIdPipe,
    OrderByNamePipe,
    OrderBySurnamePipe
  ],
  imports: [
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: exportTranslateStaticLoader,
      deps: [Http]
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MenuPage,
    HomePage,
    RoleSelectPage,
    SchoolPage,
    PopoverPage,
    ProfilePage,
    TermsPage,
    HelpPage,
    TeachersPage,
    TeacherPage,
    StudentsPage,
    StudentPage,
    GroupPage,
    CollectionTpage,
    CollectionCreate,
    CollectionTeacherDetail,
    CollectionSpage,
    CollectionStudentDetail
  ],
  providers: [
    IonicService,
    HockeyAppService,
    AvatarService,
    GradeService,
    GroupService,
    LoginService,
    MatterService,
    SchoolService,
    UserService,
    UtilsService,
    CollectionService,
    File,
    Transfer,
    Camera,
    FilePath
  ]
})
export class AppModule { }
