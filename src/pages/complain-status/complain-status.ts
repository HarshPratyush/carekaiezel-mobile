import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComplainStatusProvider } from '../../providers/complain-status/complain-status';

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

  complainsStaus:ComplainStatus[]=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private complainsStatusProvider:ComplainStatusProvider) {
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



}
