import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsServiceProvider } from '../constants-service/constants-service';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the UtilServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilServiceProvider {

  private userDetails:UserDetails;
  private menu: Array<{title: string, component: string,icon:string}>;
  constructor(public http: HttpClient,private constantsService:ConstantsServiceProvider,private toast:ToastController) {
  }

  setUserDetails()
  {
    this.userDetails=JSON.parse(localStorage.getItem(this.constantsService.USER_DETAILS)) as UserDetails;
  }

  getUserDetails()
  {
      return this.userDetails;
  }

  setMenu()
  {

        if(this.userDetails.designationIds.indexOf(1)>-1)
        {
        this.menu = [
          { title: 'Home', component: 'HomePage',icon:'home' },
          { title: 'Reach Us', component: 'HomePage',icon:'globe' },
          { title: 'Manage Profile', component: 'UserProfilePage',icon:'person' },
          { title: 'Track Complain', component: 'ComplainStatusPage',icon:'construct' },
        ];
      }
    
    else{
        this.menu = [
          { title: 'Home', component: 'HomePage',icon:'home' },
          { title: 'Reach Us', component: 'HomePage',icon:'globe' },
          { title: 'Manage Profile', component: 'UserProfilePage',icon:'person' },
          { title: 'My Assignment', component: 'AssignedComplaintPage',icon:'construct' }
        ];
      }

  }
  getMenu()
  {
      return this.menu;
  }

  showToast(message){
    
   let toastShow = this.toast.create({
     message:message,
     duration:3000,
     closeButtonText:'Ok',
     showCloseButton:true
   });
   toastShow.present();
  }

}
