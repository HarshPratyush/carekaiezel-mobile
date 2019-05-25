import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginData = {
    email:'',
    password:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:
    UserServiceProvider,private utilService:UtilServiceProvider) {
  }

  ionViewDidLoad() {
  }

  goToRegistration(){
    this.navCtrl.push('UserRegistrationPage');
  }

  async login()
  {
    let login=await this.userService.login(this.loginData);
    if(login)
    {
    this.utilService.setUserDetails();
    this.utilService.setMenu();
    this.navCtrl.setRoot('HomePage')
    }
  }
}
