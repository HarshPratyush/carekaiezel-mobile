import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetPasswordPage } from './reset-password';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetPasswordPage),
  ],providers:[UtilServiceProvider,UserServiceProvider]
})
export class ResetPasswordPageModule {}
