import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterComplaintPage } from './register-complaint';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@NgModule({
  declarations: [
    RegisterComplaintPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterComplaintPage),
  ],providers:[UtilServiceProvider]
})
export class RegisterComplaintPageModule {}
