import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { ConstantsServiceProvider } from '../../providers/constants-service/constants-service';
import { Status } from '../../enums/Status';
import { ComplainStatusProvider } from '../../providers/complain-status/complain-status';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { MechanicComplaintResolveModalPage } from '../mechanic-complaint-resolve-modal/mechanic-complaint-resolve-modal';

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
  url:string;
 

  assignedStatus=Status.ASIGNED_TO_MECHANIC;
  outForResoultion=Status.OUT_FOR_RESOLUTION;
  inProgressStatus=Status.IN_PROGRESS;
  deferredStatus=Status.DEFERRED;
  resolvedStatus=Status.RESOLVED;


  constructor(public navCtrl: NavController, public navParams: NavParams,private callNumber: CallNumber,
    private constantServiceProvider:ConstantsServiceProvider,private complaintService:ComplainStatusProvider,
    private utilService:UtilServiceProvider,private modalController:ModalController) {
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
    this.callNumber.callNumber(this.complainStatus.customerDetails.contactNo.toString(), true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  async outForResoultionSelect()
  {
    let responseData = await this.complaintService.outForResolution(this.complainStatus.id) as any;
    this.utilService.showToast(responseData.message).then(d=>{
      if(responseData.statusCode==200)
      {
        this.navCtrl.setRoot('AssignedComplaintPage')
      }
    });
  }

  async inProgressStatusSelect(){
    let responseData = await this.complaintService.inProgress(this.complainStatus.id) as any;
    this.utilService.showToast(responseData.message).then(d=>{
      if(responseData.statusCode==200)
      {
        this.navCtrl.setRoot('AssignedComplaintPage')
      }
    });

  }
  async deferredStatusSelect(){
   
    let modal=this.modalController.create('MechanicComplaintResolveModalPage',{title:'Defer Complaint',button:'Defer',color:'danger'});
    modal.present();

    modal.onWillDismiss(
      async d=>{
        if(d){
         let responseData = await this.complaintService.deferred(this.complainStatus.id,d.amount,d.remark) as any;
    this.utilService.showToast(responseData.message).then(d=>{
      if(responseData.statusCode==200)
      {
        this.navCtrl.setRoot('AssignedComplaintPage')
      }
    });
  }
      }
    )

  }
  async resolvedStatusSelect(){


    let modal=this.modalController.create('MechanicComplaintResolveModalPage',{title:'Reslove Complaint',button:'Resolve',color:'resolved'});
    modal.present();

    modal.onWillDismiss(
      async d=>{
        if(d){
         let responseData = await this.complaintService.resolved(this.complainStatus.id,d.amount,d.remark) as any;
    this.utilService.showToast(responseData.message).then(d=>{
      if(responseData.statusCode==200)
      {
        this.navCtrl.setRoot('AssignedComplaintPage')
      }
    });
  }
      }
    )
  

  }


  

}
