import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConstantsServiceProvider } from '../../providers/constants-service/constants-service';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  icons: Array<{title: string, component: string,icon:string}>=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public constantsService:ConstantsServiceProvider,public utilServiceProvider:UtilServiceProvider) {
      this.icons=utilServiceProvider.getMenu().filter(d=>d.component!='HomePage');
    }

  ionViewDidLoad() {
  }

  ngOnInit(){
    if(localStorage.getItem(this.constantsService.USER_DETAILS)==null)
    {
      this.navCtrl.setRoot('LoginPage');
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component!='Logout')
    this.navCtrl.setRoot(page.component);
    else
    {
      localStorage.clear();
      this.navCtrl.setRoot('LoginPage');
    }
  }

}
