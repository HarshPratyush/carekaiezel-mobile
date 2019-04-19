import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsServiceProvider } from '../constants-service/constants-service';

/*
  Generated class for the ComplainStatusProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComplainStatusProvider {

  constructor(public http: HttpClient,private constants:ConstantsServiceProvider) {
  }

  async getComplainStatus()
  {
    let complainsStatus= await this.http.get(this.constants.API_GATEWAY+this.constants.GET_USER_COMPLAIN_STATUS).toPromise() as  ComplainStatus[]; 
    return complainsStatus;
  }
}
