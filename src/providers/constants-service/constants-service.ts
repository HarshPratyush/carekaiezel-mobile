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

}
