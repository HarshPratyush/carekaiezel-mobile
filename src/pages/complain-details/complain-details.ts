import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { ConstantsServiceProvider } from '../../providers/constants-service/constants-service';
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
  url:string
  constructor(public navCtrl: NavController, public navParams: NavParams,private callNumber: CallNumber,private constantServiceProvider:ConstantsServiceProvider) {
    this.url=constantServiceProvider.API_GATEWAY+constantServiceProvider.DOC_URL
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

  time24HrTo12Hr(timeString){

    let H = +timeString.substr(0, 2);
    let h = H % 12 || 12;
    let ampm = (H < 12 || H === 24) ? " AM" : " PM";
  return ( h + timeString.substr(2, 3) + ampm);

  }
}
