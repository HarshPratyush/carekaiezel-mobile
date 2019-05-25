import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsServiceProvider } from '../constants-service/constants-service';
import { NewUserModel } from '../../models/newUserModel';
import { URLSearchParams } from '@angular/http';
import { UtilServiceProvider } from '../util-service/util-service';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient,private constants:ConstantsServiceProvider,private utilService:UtilServiceProvider) {
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
     // let response = await this.http.post(this.constants.API_GATEWAY+this.constants.UPDATE_USER,userProfile).toPromise();
    }

}
