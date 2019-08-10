import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePasswordPage } from './change-password';
import { ConstantsServiceProvider } from '../../providers/constants-service/constants-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@NgModule({
  declarations: [
    ChangePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePasswordPage),
  ],
  providers:[ConstantsServiceProvider,UserServiceProvider,UtilServiceProvider]
})
export class ChangePasswordPageModule {}
