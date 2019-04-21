import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsServiceProvider } from '../constants-service/constants-service';

/*
  Generated class for the UtilServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilServiceProvider {

  private userDetails:UserDetails;
  private menu: Array<{title: string, component: any}>;
  constructor(public http: HttpClient,private constantsService:ConstantsServiceProvider) {
  }

  setUserDetails()
  {
    this.userDetails=JSON.parse(localStorage.getItem(this.constantsService.USER_DETAILS)) as UserDetails;
  }

  getUserDetails()
  {
      return this.userDetails;
  }

  setMenu()
  {

        if(this.userDetails.designationIds.indexOf(1)>-1)
        {
        this.menu = [
          { title: 'Home', component: 'HomePage' },
          { title: 'Reach Us', component: 'HomePage' },
          { title: 'Manage Profile', component: 'UserProfilePage' },
          { title: 'Track Complain', component: 'ComplainStatusPage' },
        ];
      }
    
    else{
        this.menu = [
          { title: 'Home', component: 'HomePage' },
          { title: 'Reach Us', component: 'HomePage' },
          { title: 'Manage Profile', component: 'UserProfilePage' },
          { title: 'My Assignment', component: 'AssignedComplaintPage' }
        ];
      }

  }
  getMenu()
  {
      return this.menu;
  }

}
