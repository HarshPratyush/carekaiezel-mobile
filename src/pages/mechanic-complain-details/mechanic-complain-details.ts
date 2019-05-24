import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { ConstantsServiceProvider } from '../../providers/constants-service/constants-service';

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
  url:string
  constructor(public navCtrl: NavController, public navParams: NavParams,private callNumber: CallNumber,private constantServiceProvider:ConstantsServiceProvider) {
    this.url=constantServiceProvider.API_GATEWAY+constantServiceProvider.DOC_URL
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
