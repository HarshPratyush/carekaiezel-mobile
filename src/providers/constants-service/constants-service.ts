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

  public  get API_GATEWAY(){return 'assets/data/'}

  public get USER_ROLES_URL(){return 'userRoles-dummy.json'};

  public get SIGNUP_URL(){return 'userRoles-dummy.json'};

  public get LOGIN_URL(){return 'oauth/token'};

  public get USER_DATA(){return 'user-details.json'};

  public get ACESS_TOKEN(){return 'kaizel_acess_token'};

  public get REFRESH_TOKEN(){return 'kaizel_refresh_token'};

  public get USER_DETAILS(){return 'kaizel_user_details'};

  public get UPDATE_USER() {return ''};

  public get GET_USER_COMPLAIN_STATUS(){return 'complain-status.json'};

  public get GET_MECHANIC_COMPLAIN_STATUS(){return 'mechanic-complaint-status.json'}

}
