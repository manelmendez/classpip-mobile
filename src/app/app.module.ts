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

//services
import { LoginService } from '../providers/login.service';
import { UtilsService } from '../providers/utils.service';
import { HockeyAppService } from '../providers/hockeyapp.service';

// rxjs
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export function exportTranslateStaticLoader(http: Http) {
  return new TranslateStaticLoader(http, AppConfig.LANG_PATH, AppConfig.LANG_EXT);
}

@NgModule({
  declarations: [
    // pages
    MyApp,
    LoginPage,
    MenuPage,
    HomePage
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
    HomePage
  ],
  providers: [
    LoginService,
    UtilsService,
    HockeyAppService
  ]
})
export class AppModule { }
