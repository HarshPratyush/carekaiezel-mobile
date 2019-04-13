import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

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
    UserServiceProvider) {
  }

  ionViewDidLoad() {
  }

  goToRegistration(){
    this.navCtrl.push('UserRegistrationPage');
  }

  async login()
  {
    await this.userService.login(this.loginData);
    this.navCtrl.setRoot('HomePage')
  }
}
