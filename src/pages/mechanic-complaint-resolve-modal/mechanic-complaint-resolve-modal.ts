import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

/**
 * Generated class for the MechanicComplaintResolveModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mechanic-complaint-resolve-modal',
  templateUrl: 'mechanic-complaint-resolve-modal.html',
})
export class MechanicComplaintResolveModalPage {
  title;
  remark;
  amount;
  button;
  color;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private utilService:UtilServiceProvider) {
  }

  ionViewDidLoad() {
    this.title=this.navParams.get('title');
    this.button=this.navParams.get('button');
    this.color=this.navParams.get('color');
  }

  close(){
    this.viewCtrl.dismiss()
  }

  update()
  {

     if(!this.amount)
    {
      this.utilService.showToast('Please Enter amount Charged')
    }

    else if(!this.remark)
    {
      this.utilService.showToast('Please enter remark');
    }


    else
    this.viewCtrl.dismiss({remark:this.remark,amount:this.amount});
  }

}
