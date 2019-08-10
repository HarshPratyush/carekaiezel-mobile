import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ConstantsServiceProvider } from '../../providers/constants-service/constants-service';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class 
ChangePasswordPage {

  changePassword:ChangePasswordModel={oldPassword:'',confirmPassword:'',newPassword:'',userName:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,private utilService:UtilServiceProvider,
    private constants: ConstantsServiceProvider,private userServiceProvide:UserServiceProvider) {
  }

  ionViewDidLoad() {
  }

  async updateProfile()
  {


    if(!this.changePassword.oldPassword)
    {
      this.utilService.showToast('Provide Current Password')
    }
    else if(!this.changePassword.oldPassword.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/))
    {
      this.utilService.showToast('Provide valid Current Password of atleast 7 charcter Ex:- abcd@132&')
    }
    else if(!this.changePassword.newPassword)
    {
      this.utilService.showToast('Provide New Password')
    }
    else if(!this.changePassword.newPassword.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/))
    {
      this.utilService.showToast('Provide valid New Password of atleast 7 charcter Ex:- abcd@132&')
    }
    else if(!this.changePassword.confirmPassword)
    {
      this.utilService.showToast('Provide Confirm Password')
    }

    else if(this.changePassword.newPassword!=this.changePassword.confirmPassword)
    {
      this.utilService.showToast('Password And confirm password is not matching')
    }

    else
    {
      this.changePassword.userName = (JSON.parse( localStorage.getItem(this.constants.USER_DETAILS)) as any).username;
      let response:boolean=await this.userServiceProvide.changePassword(this.changePassword);
      if(response)
      {
        this.navCtrl.setRoot("LoginPage");
      }
    }
  }
}
