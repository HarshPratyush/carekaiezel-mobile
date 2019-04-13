import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConstantsServiceProvider } from '../providers/constants-service/constants-service';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';
  userDetails:UserDetails;

  userPages: Array<{title: string, component: any}>;


  mechanicPage: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private constantsService:ConstantsServiceProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.userPages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Reach Us', component: 'HomePage' },
      { title: 'Register Complain', component: 'HomePage' },
      { title: 'Direct Complain', component: 'HomePage' },
      { title: 'Manage Profile', component: 'HomePage' },
      { title: 'Track Com[plain', component: 'HomePage' },
      { title: 'Upload Image', component: 'HomePage' },
    ];


    this.mechanicPage = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Manage Profile', component: 'HomePage' },
      { title: 'Complain Assignment', component: 'HomePage' },
      { title: 'Update Complain Status', component: 'HomePage' },
      { title: 'Image Upload', component: 'HomePage' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if(localStorage.getItem(this.constantsService.USER_DETAILS)!=null)
      {
        this.userDetails=JSON.parse(localStorage.getItem(this.constantsService.USER_DETAILS)) as UserDetails;
        console.log(this.userDetails)
        this.rootPage='HomePage';
      }

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
