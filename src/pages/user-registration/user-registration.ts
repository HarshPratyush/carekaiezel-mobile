import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { NewUserModel } from '../../models/newUserModel';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

/**
 * Generated class for the UserRegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-registration',
  templateUrl: 'user-registration.html',
})
export class UserRegistrationPage {


  userRoles:UserRoles[]=[];
  newUser:NewUserModel = new NewUserModel();

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService:UserServiceProvider,private utilService:UtilServiceProvider) {

  
  }

  ionViewDidLoad() {
  }

  ngOnInit()
  {

    this.getRoles();
  }

  async getRoles()
  {
    this.userRoles = await this.userService.getUserRoles();
  }

  async signUp()
  {
    let mobileNumRegex = new RegExp(/^([0-9]{10,11})$/);
    let emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(!this.newUser.roleId)
    {
      this.utilService.showToast('Select User Type')
    }

    else if(!this.newUser.firstName)
    {
      this.utilService.showToast('Provide First Name')
    }

    else if(!this.newUser.lastName)
    {
      this.utilService.showToast('Provide Last Name')
    }


    else if(!this.newUser.contactNo )
    {
      this.utilService.showToast('Provide Contact No.')
    }

    else if(!mobileNumRegex.test(this.newUser.contactNo))
    {
      this.utilService.showToast('Provide Valid Contact No.')
    }

    else if(!this.newUser.emailId )
    {
      this.utilService.showToast('Provide Email Id')
    }

    else if(!emailRegex.test(this.newUser.emailId))
    {
      this.utilService.showToast('Provide Valid Email Id.') 
    }

    else if(!this.newUser.password)
    {
      this.utilService.showToast('Provide Password')
    }
    else if(!this.newUser.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/))
    {
      this.utilService.showToast('Provide valid Password of atleast 7 charcter Ex:- abcd@132&')
    }
    else if(!this.newUser.confirmPassword)
    {
      this.utilService.showToast('Provide Confirm Password')
    }

    else if(this.newUser.password!=this.newUser.confirmPassword)
    {
      this.utilService.showToast('Password And confirm password is not matching')
    }

    else
{
    let result:any=await this.userService.signup(this.newUser);

    if(result.statusCode==200)
    this.navCtrl.setRoot('LoginPage');


    else{
      this.utilService.showToast(result.message)
    }
}
  }
}
