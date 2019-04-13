import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConstantsServiceProvider } from '../../providers/constants-service/constants-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public constantsService:ConstantsServiceProvider) {
  }

  ionViewDidLoad() {
  }

  ngOnInit(){
    if(localStorage.getItem(this.constantsService.USER_DETAILS)==null)
    {
      this.navCtrl.setRoot('LoginPage');
    }
  }

}
