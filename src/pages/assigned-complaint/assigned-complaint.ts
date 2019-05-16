import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComplainStatusProvider } from '../../providers/complain-status/complain-status';

/**
 * Generated class for the AssignedComplaintPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assigned-complaint',
  templateUrl: 'assigned-complaint.html',
})
export class AssignedComplaintPage {

  complainsStaus:ComplainStatus[]=[]

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private complainsStatusProvider:ComplainStatusProvider) {
  }

  ionViewDidLoad() {
  }
ngOnInit()
{
  this.getComplainsStaus();
}
async getComplainsStaus(){
    this.complainsStaus = await this.complainsStatusProvider.getComplainStatusMechanic();
  }

  viewDetails(complainStatus:ComplainStatus)
  {
    this.navCtrl.push('MechanicComplainDetailsPage',complainStatus)
  }


}
