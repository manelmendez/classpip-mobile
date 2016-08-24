import {
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
}                               from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders } from '@angular/core/testing';
import { MyApp }                from './app';
import { HelloIonicPage }       from './pages/hello-ionic/hello-ionic';

// this needs doing _once_ for the entire test suite, hence it's here
setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

let myApp: MyApp = null;

// Mock out Ionic's platform class
class MockClass {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }

  public close(): any {
    return true;
  }

  public setRoot(): any {
    return true;
  }
}

describe('MyApp', () => {

  beforeEach(function() {
    let mockClass = (<any>new MockClass());
    myApp = new MyApp(mockClass, mockClass);
  });

  it('initialises with two possible pages', () => {
    expect(myApp['pages'].length).toEqual(1);
  });

  it('initialises with a root page', () => {
    expect(myApp['rootPage']).not.toBe(null);
  });

  it('initialises with an app', () => {
    expect(myApp['app']).not.toBe(null);
  });

  it('opens a page', () => {
    spyOn(myApp['menu'], 'close');
    // cant be bothered to set up DOM testing for app.ts to get access to @ViewChild (Nav)
    myApp['nav'] = (<any>myApp['menu']);
    spyOn(myApp['nav'], 'setRoot');
    myApp.openPage(myApp['pages'][0]);
    expect(myApp['menu']['close']).toHaveBeenCalled();
    expect(myApp['nav'].setRoot).toHaveBeenCalledWith(HelloIonicPage);
  });
});
