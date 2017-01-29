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

// services
import { UtilsService } from '../providers/utils.service';
import { LoginService } from '../providers/login.service';
import { SchoolService } from '../providers/school.service';
import { HockeyAppService } from '../providers/hockeyapp.service';
import { UserService } from '../providers/user.service';

// rxjs
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';

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
    HelpPage
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
    HelpPage
  ],
  providers: [
    UtilsService,
    LoginService,
    HockeyAppService,
    SchoolService,
    UserService
  ]
})
export class AppModule { }
