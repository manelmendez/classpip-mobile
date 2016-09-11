import {Component, provide, Type, ViewChild}            from '@angular/core';
import {disableDeprecatedForms, provideForms}           from '@angular/forms';
import {ionicBootstrap, Platform, MenuController, Nav}  from 'ionic-angular';
import {StatusBar, Splashscreen}                        from 'ionic-native';
import {HomePage}                                 from './pages/home/home';

@Component({
  templateUrl: 'build/app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  private rootPage: Type;
  private pages: Array<{ title: string, component: any }>;
  private menu: MenuController;
  private platform: Platform;

  constructor(platform: Platform, menu: MenuController) {

    this.platform = platform;
    this.menu = menu;

    this.rootPage = HomePage;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
    ];
  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  public openPage(page: any): void {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp, [

  disableDeprecatedForms(),
  provideForms(),
  HomePage
]);
