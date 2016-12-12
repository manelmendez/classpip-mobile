import './polyfills.ts';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule, LoadingController, AlertController, GestureController } from 'ionic-angular';
import { TranslateModule, TranslateService, TranslateLoader, TranslateParser } from 'ng2-translate/ng2-translate';
import { ConfigMock } from './mocks';

// services
import { LoginService } from './providers/login.service'
import { UtilsService } from './providers/utils.service'

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
/* tslint:disable */
declare var __karma__: any;
declare var require: any;
/* tslint:enable */

// Prevent Karma from running prematurely.
/* tslint:disable */
__karma__.loaded = function (): any { /* no op */ };
/* tslint:enable */

Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing'),
])
  // First, initialize the Angular testing environment.
  .then(([testing, testingBrowser]) => {
    testing.getTestBed().initTestEnvironment(
      testingBrowser.BrowserDynamicTestingModule,
      testingBrowser.platformBrowserDynamicTesting()
    );
  })
  // Then we find all the tests.
  .then(() => require.context('./', true, /\.spec\.ts/))
  // And load the modules.
  .then(context => context.keys().map(context))
  // Finally, start Karma to run the tests.
  .then(__karma__.start, __karma__.error);

export class TestUtils {

  /* tslint:disable */
  public static beforeEachCompiler(components: Array<any>): Promise<{ fixture: any, instance: any }> {
    /* tslint:enable */
    return TestUtils.configureIonicTestingModule(components)
      .compileComponents().then(() => {
        /* tslint:disable */
        let fixture: any = TestBed.createComponent(components[0]);
        /* tslint:enable */
        return {
          fixture: fixture,
          instance: fixture.debugElement.componentInstance,
        };
      });
  }

  /* tslint:disable */
  public static configureIonicTestingModule(components: Array<any>): typeof TestBed {
    /* tslint:enable */
    return TestBed.configureTestingModule({
      declarations: [
        ...components
      ],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController,
        LoadingController, AlertController, GestureController,
        TranslateService, TranslateLoader, TranslateParser,
        { provide: Config, useClass: ConfigMock },
        // services
        LoginService,
        UtilsService
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        TranslateModule,
      ],
    });
  }

  // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
  /* tslint:disable */
  public static eventFire(el: any, etype: string): void {
    /* tslint:enable */
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      /* tslint:disable */
      let evObj: any = document.createEvent('Events');
      /* tslint:enable */
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }
}
