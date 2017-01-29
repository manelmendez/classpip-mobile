import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

// application
import { MyApp, AppConfig } from './';
import { LoginPage, MenuPage, HomePage, RoleSelectPage, SchoolPage, PopoverPage } from '../pages';
import { UtilsService } from '../providers/utils.service';
import { LoginService } from '../providers/login.service';
import { SchoolService } from '../providers/school.service';
import { HockeyAppService } from '../providers/hockeyapp.service';

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
    PopoverPage
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
    PopoverPage
  ],
  providers: [
    UtilsService,
    LoginService,
    HockeyAppService,
    SchoolService
  ]
})
export class AppModule { }
