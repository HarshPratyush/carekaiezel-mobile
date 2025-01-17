import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsServiceProvider } from '../constants-service/constants-service';
import { ToastController, LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the UtilServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilServiceProvider {

  loaderObject:Loading;
  private userDetails:UserDetails;
  private menu: Array<{title: string, component: string,icon:string}>;
  loaderUsed:boolean=false;
  constructor(public http: HttpClient,
    private constantsService:ConstantsServiceProvider,private toast:ToastController,private loader:LoadingController) {
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
          { title: 'Reach Us', component: 'AboutUsPage',icon:'call' },
          { title: 'Manage Profile', component: 'UserProfilePage',icon:'person' },
          { title: 'Change Password', component: 'ChangePasswordPage',icon:'lock' },
          { title: 'Track Complain', component: 'ComplainStatusPage',icon:'construct' },
          { title: 'Log Out', component: 'Logout',icon:'power' }
        ];
      }
    
    else{
        this.menu = [
          { title: 'Home', component: 'HomePage',icon:'home' },
          { title: 'Reach Us', component: 'AboutUsPage',icon:'call' },
          { title: 'Manage Profile', component: 'UserProfilePage',icon:'person' },
          { title: 'Change Password', component: 'ChangePasswordPage',icon:'lock' },
          { title: 'My Assignment', component: 'AssignedComplaintPage',icon:'construct' },
          { title: 'Log Out', component: 'Logout',icon:'power' }
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
  return toastShow.present();
  }

  async createLoader()
  {
  this.loaderObject = await this.loader.create();
  this.loaderUsed=true;
  this.loaderObject.present();
  this.loaderObject.onWillDismiss(d=>{
    this.loaderUsed=false
  });
  
}

  stopLoader()
  {
        this.loaderObject.dismiss()
  }

}
