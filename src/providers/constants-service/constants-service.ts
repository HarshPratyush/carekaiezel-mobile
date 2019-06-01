import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConstantsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstantsServiceProvider {

  constructor(public http: HttpClient) {
  }

  public  get API_GATEWAY(){return 'http://care.kaizelengineers.com/carekaizel-bkend/'}

  // public  get API_GATEWAY(){return 'http://192.168.43.66:8080/'}

  public get USER_ROLES_URL(){return 'anynomus/getAllRole'};

  public get SIGNUP_URL(){return 'anynomus/saveUserRegistration'};

  public get LOGIN_URL(){return 'oauth/token'};

  public get USER_DATA(){return 'user'};

  public get ACCESS_TOKEN(){return 'kaizel_acess_token'};

  public get REFRESH_TOKEN(){return 'kaizel_refresh_token'};

  public get USER_DETAILS(){return 'kaizel_user_details'};

  public get UPDATE_USER() {return 'updateUser'};

  public get GET_USER_COMPLAIN_STATUS(){return 'customerComplainStatus'};

  public get GET_MECHANIC_COMPLAIN_STATUS(){return 'mechanicComplainStatus'}


  public get REGISTER_COMPLAINT_URL(){return 'registerComplain'}

  public get DOC_URL(){return 'anynomus/doc?fileId='}

  public get HELP_NO() {return '18001202690'}

}
