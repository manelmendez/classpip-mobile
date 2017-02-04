import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

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

// services
import { IonicService } from '../providers/ionic.service';
import { HockeyAppService } from '../providers/hockeyapp.service';

// modules
import { UtilsModule } from 'classpip-utils'

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
    GroupPage
  ],
  imports: [
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: exportTranslateStaticLoader,
      deps: [Http]
    }),
    UtilsModule,
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
    GroupPage
  ],
  providers: [
    IonicService,
    HockeyAppService
  ]
})
export class AppModule { }
