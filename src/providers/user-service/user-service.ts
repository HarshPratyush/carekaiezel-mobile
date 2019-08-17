import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsServiceProvider } from '../constants-service/constants-service';
import { NewUserModel } from '../../models/newUserModel';
import { URLSearchParams } from '@angular/http';
import { UtilServiceProvider } from '../util-service/util-service';
import { FCM } from '@ionic-native/fcm';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient,private constants:ConstantsServiceProvider,
    private utilService:UtilServiceProvider,private fcm: FCM) {
  }


  async getUserRoles(){
    return await this.http.get(
      this.constants.API_GATEWAY+
      this.constants.USER_ROLES_URL).toPromise() as UserRoles[];
  }

  async signup(newUser:NewUserModel)
  {

  //to be uncommented  // 
  return await this.http.post(this.constants.API_GATEWAY+this.constants.SIGNUP_URL,newUser).toPromise();
   // to be removed
    // return await this.http.get(this.constants.API_GATEWAY+this.constants.USER_ROLES_URL).toPromise() as UserRoles[];
  }

  async login(userData)
  {
    //to be uncommented
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      })
    };

    let params = new URLSearchParams();
    params.append('username', userData.email);
    params.append('password', userData.password);
    params.append('grant_type', 'password');

    try{
    
    let tokens=  await this.http.post(this.constants.API_GATEWAY+this.constants.LOGIN_URL,params.toString(),httpOptions).toPromise() as any;
     
    const httpOptionsUser = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + tokens.access_token,
        'Content-type': 'application/json'
      })
    };

    let userDetails=await this.http.get(this.constants.API_GATEWAY+this.constants.USER_DATA,httpOptionsUser).toPromise() as UserDetails;
     localStorage.setItem(this.constants.ACCESS_TOKEN,tokens.access_token);
     localStorage.setItem(this.constants.REFRESH_TOKEN,tokens.refresh_token);
     localStorage.setItem(this.constants.USER_DETAILS,JSON.stringify(userDetails));
     this.initToken();
     return true;
    }
    catch (error){
      this.utilService.showToast(error.error.error_description)
      return false;
    }
 
    }


    async update(userProfile:ProfieModel)
    {
      // to be uncommented

      try{
        const httpOptionsUser = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem(this.constants.ACCESS_TOKEN),
            'Content-type': 'application/json'
          })
        };
     let response = await this.http.post(this.constants.API_GATEWAY+this.constants.UPDATE_USER,userProfile).toPromise() as any;
     let userDetails=await this.http.get(this.constants.API_GATEWAY+this.constants.USER_DATA,httpOptionsUser).toPromise() as UserDetails;
     localStorage.setItem(this.constants.USER_DETAILS,JSON.stringify(userDetails));
     this.utilService.showToast(response.message)  
    }
      catch(error){
        this.utilService.showToast(error.error.error_description)
      }
    }

    async changePassword(changePassword:ChangePasswordModel){

      
      try{
      
     let response = await this.http.post(this.constants.API_GATEWAY+this.constants.CHANGE_PASSWORD,changePassword).toPromise() as any;
     this.utilService.showToast(response);
     return true;
    }
      catch(error){
        this.utilService.showToast(error.error);
        return false;
      }

    }

    async sendOtp(emailId)
    {
      try{
        let response = await this.http.get(this.constants.API_GATEWAY+this.constants.SEND_OTP+emailId).toPromise() as any;
        this.utilService.showToast(response);
        return true;
      }
      catch(error){
        this.utilService.showToast(error.error);
        return false;
      }
    }

    async resetPassword(resetPassword:ResetPassword){

      
      try{
      
     let response = await this.http.post(this.constants.API_GATEWAY+this.constants.RESET_PASSWORD,resetPassword).toPromise() as any;
     this.utilService.showToast(response);
     return true;
    }
      catch(error){
        this.utilService.showToast(error.error);
        return false;
      }

    }

    initToken(){
      this.fcm.getToken().then(token => {
        this.registerToken(token);
      });
      
      this.fcm.onNotification().subscribe(data => {
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      });
      
      this.fcm.onTokenRefresh().subscribe(token => {
        this.registerToken(token);
      });
    }

    registerToken(token){
 this.http.post(this.constants.API_GATEWAY+this.constants.REGISTER_TOKEN,token).toPromise().then(d=>{});
    }

}
