import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRegistrationPage } from './user-registration';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@NgModule({
  declarations: [
    UserRegistrationPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRegistrationPage),
  ],
  providers:[UserServiceProvider,UtilServiceProvider]
})
export class UserRegistrationPageModule {}
