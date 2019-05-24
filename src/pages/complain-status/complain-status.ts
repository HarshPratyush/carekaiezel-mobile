import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComplainStatusProvider } from '../../providers/complain-status/complain-status';
import { ConstantsServiceProvider } from '../../providers/constants-service/constants-service';

/**
 * Generated class for the ComplainStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complain-status',
  templateUrl: 'complain-status.html',
})
export class ComplainStatusPage {

  url:string;
  complainsStaus:ComplainStatus[]=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private complainsStatusProvider:ComplainStatusProvider,private constantServiceProvider:ConstantsServiceProvider) {
      this.url=constantServiceProvider.API_GATEWAY+constantServiceProvider.DOC_URL
  }

  ionViewDidLoad() {
  }

  ngOnInit(){
    this.getComplainsStaus();
  }

  async getComplainsStaus(){
    this.complainsStaus = await this.complainsStatusProvider.getComplainStatus();
  }

  viewDetails(complainStatus:ComplainStatus)
  {
    this.navCtrl.push('ComplainDetailsPage',complainStatus)
  }

  addNewComplaint()
  {
    this.navCtrl.push('RegisterComplaintPage');
  }



}
