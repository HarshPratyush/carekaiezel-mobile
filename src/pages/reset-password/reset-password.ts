import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  otpSent:boolean=false;

  resetPassword:ResetPassword={confirmPassword:'',emailId:'',newPassword:'',otp:''}
  constructor(public navCtrl: NavController, public navParams: NavParams,public utilService:UtilServiceProvider
    ,public userService:UserServiceProvider) {
  }

  ionViewDidLoad() {
  }

  async sendOtp(){
    let emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if(!this.resetPassword.emailId )
    {
      this.utilService.showToast('Provide Email Id')
    }

    else if(!emailRegex.test(this.resetPassword.emailId))
    {
      this.utilService.showToast('Provide Valid Email Id.') 
    }

    else{
     this.otpSent= await this.userService.sendOtp(this.resetPassword.emailId);
    
  }
  }

  async callresetPassword(){

    if(!this.resetPassword.otp)
    {
      this.utilService.showToast('Provide otp')
    }
    else if(!this.resetPassword.otp.match(/^\d{4}$/))
    {
      this.utilService.showToast('Provide valid otp  of 4  numbers')
    }
    else if(!this.resetPassword.newPassword)
    {
      this.utilService.showToast('Provide New Password')
    }
    else if(!this.resetPassword.newPassword.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/))
    {
      this.utilService.showToast('Provide valid New Password of atleast 7 charcter Ex:- abcd@132&')
    }
    else if(!this.resetPassword.confirmPassword)
    {
      this.utilService.showToast('Provide Confirm Password')
    }

    else if(this.resetPassword.newPassword!=this.resetPassword.confirmPassword)
    {
      this.utilService.showToast('Password And confirm password is not matching')
    }

    else
    {
      let response:boolean=await this.userService.resetPassword(this.resetPassword);
      if(response)
      {
        this.navCtrl.setRoot("LoginPage");
      }
    }

  }

}
