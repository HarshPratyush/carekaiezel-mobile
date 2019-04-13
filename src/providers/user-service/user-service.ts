import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsServiceProvider } from '../constants-service/constants-service';
import { NewUserModel } from '../../models/newUserModel';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient,private constants:ConstantsServiceProvider) {
  }


  async getUserRoles(){
    return await this.http.get(this.constants.API_GATEWAY+this.constants.USER_ROLES_URL).toPromise() as UserRoles[];
  }

  async signup(newUser:NewUserModel)
  {

  //to be uncommented  // return await this.http.post(this.constants.API_GATEWAY+this.constants.SIGNUP_URL,newUser).toPromise();
   // to be removed
    return await this.http.get(this.constants.API_GATEWAY+this.constants.USER_ROLES_URL).toPromise() as UserRoles[];
  }

  async login(userData)
  {
    //to be uncommented

    // let tokens=  await this.http.post(this.constants.API_GATEWAY+this.constants.LOGIN_URL,userData).toPromise() as any;

    // to be removed
     let userDetails=await this.http.get(this.constants.API_GATEWAY+this.constants.USER_DATA).toPromise() as UserDetails;

    // localStorage.setItem(this.constants.ACESS_TOKEN,tokens.access_token);
    // localStorage.setItem(this.constants.REFRESH_TOKEN,tokens.refresh_token);
    localStorage.setItem(this.constants.USER_DETAILS,JSON.stringify(userDetails));
    }

}
