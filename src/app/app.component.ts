import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConstantsServiceProvider } from '../providers/constants-service/constants-service';
import { UtilServiceProvider } from '../providers/util-service/util-service';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ='LoginPage';;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private constantsService:ConstantsServiceProvider,
    public utilService:UtilServiceProvider) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if(localStorage.getItem(this.constantsService.USER_DETAILS)!=null)
      {
        this.utilService.setUserDetails();
        this.utilService.setMenu();
        this.rootPage='HomePage';
      }
      else{
        this.rootPage= 'LoginPage';
      }

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component!='Logout')
    this.nav.setRoot(page.component);
    else
    {
      localStorage.clear();
      this.nav.setRoot('LoginPage');
    }
  }
}
