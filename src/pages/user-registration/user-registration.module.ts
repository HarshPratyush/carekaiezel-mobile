import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRegistrationPage } from './user-registration';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@NgModule({
  declarations: [
    UserRegistrationPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRegistrationPage),
  ],
  providers:[UserServiceProvider]
})
export class UserRegistrationPageModule {}
