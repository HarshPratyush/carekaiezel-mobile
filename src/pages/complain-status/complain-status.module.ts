import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplainStatusPage } from './complain-status';
import { ConstantsServiceProvider } from '../../providers/constants-service/constants-service';
import { ComplainStatusProvider } from '../../providers/complain-status/complain-status';

@NgModule({
  declarations: [
    ComplainStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplainStatusPage),
  ],
  providers:[ConstantsServiceProvider,ComplainStatusProvider]
})
export class ComplainStatusPageModule {}
