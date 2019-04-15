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
          { title: 'Register Complain', component: 'HomePage' },
          { title: 'Direct Complain', component: 'HomePage' },
          { title: 'Manage Profile', component: 'UserProfilePage' },
          { title: 'Track Com[plain', component: 'HomePage' },
          { title: 'Upload Image', component: 'HomePage' },
        ];
      }
    
    else{
        this.menu = [
          { title: 'Home', component: 'HomePage' },
          { title: 'Manage Profile', component: 'UserProfilePage' },
          { title: 'Complain Assignment', component: 'HomePage' },
          { title: 'Update Complain Status', component: 'HomePage' },
          { title: 'Image Upload', component: 'HomePage' },
        ];
      }

  }
  getMenu()
  {
      return this.menu;
  }

}
