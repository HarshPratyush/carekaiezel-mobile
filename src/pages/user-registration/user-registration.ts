import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { NewUserModel } from '../../models/newUserModel';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private userService:UserServiceProvider) {
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

}
