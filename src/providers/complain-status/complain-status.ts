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
    let complainsStatus= await this.http.post(this.constants.API_GATEWAY+this.constants.GET_USER_COMPLAIN_STATUS,null).toPromise() as  ComplainStatus[]; 
    return complainsStatus;
  }

  async getComplainStatusMechanic()
  {
    let complainsStatus= await this.http.get(this.constants.API_GATEWAY+this.constants.GET_MECHANIC_COMPLAIN_STATUS).toPromise() as  ComplainStatus[]; 
    return complainsStatus;
  }

  async registerComplaint(complainRegister)
  {
    let registerComplaintSatus = await this.http.post(this.constants.API_GATEWAY+this.constants.REGISTER_COMPLAINT_URL,complainRegister).toPromise()
    return registerComplaintSatus;
  }

  async getAllProducts(){
    let allProducts = await this.http.get(this.constants.API_GATEWAY+this.constants.GET_ALL_PRODUCT).toPromise();
    return allProducts;
  }

  async outForResolution(complainId) {
    let responseModel = await this.http.post(this.constants.API_GATEWAY+'outForResolution'+'?complainId='+complainId,null).toPromise()
    return  responseModel
	}
	
	async inProgress( complainId) {
    let responseModel = await this.http.post(this.constants.API_GATEWAY+'inProgress'+'?complainId='+complainId,null).toPromise()
    return  responseModel
	}
	
	async deferred( complainId,  amountCharged,  remarkByMechanic) {
    let responseModel = await this.http.post(this.constants.API_GATEWAY+'deferred'+'?complainId='+complainId+'&amountCharged='+amountCharged+'&remarkByMechanic='+remarkByMechanic,null).toPromise()
    return  responseModel
	}
	
	async resolved( complainId,  amountCharged,  remarkByMechanic) {
    let responseModel = await this.http.post(this.constants.API_GATEWAY+'resolved'+'?complainId='+complainId+'&amountCharged='+amountCharged+'&remarkByMechanic='+remarkByMechanic,null).toPromise()
    return  responseModel
	}
}
