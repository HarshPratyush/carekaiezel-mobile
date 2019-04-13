import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsServiceProvider } from '../constants-service/constants-service';

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

}
