import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the MechanicComplainDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mechanic-complain-details',
  templateUrl: 'mechanic-complain-details.html',
})
export class MechanicComplainDetailsPage {

  complainStatus:ComplainStatus
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private callNumber: CallNumber) {
  }

  ionViewDidLoad() {
  }

  ngOnInit(){
    if(this.navParams.data && this.navParams.data.id)
    this.complainStatus=this.navParams.data;
    else
    this.navCtrl.setRoot('AssignedComplaintPage')
  }

  callCustomer()
  {
    this.callNumber.callNumber(this.complainStatus.customerContactNumber.toString(), true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

}
