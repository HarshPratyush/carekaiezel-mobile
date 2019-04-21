import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the ComplainDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complain-details',
  templateUrl: 'complain-details.html',
})
export class ComplainDetailsPage {

  complainStatus:ComplainStatus

  constructor(public navCtrl: NavController, public navParams: NavParams,private callNumber: CallNumber) {
  }

  ionViewDidLoad() {
  }

  ngOnInit()
  {
    if(this.navParams.data && this.navParams.data.id)
    this.complainStatus=this.navParams.data;
    else
    this.navCtrl.setRoot('ComplainStatusPage')
  }

  callMechanic()
  {
    this.callNumber.callNumber(this.complainStatus.mechanicContactNumber.toString(), true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
