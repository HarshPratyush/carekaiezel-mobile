import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignedComplaintPage } from './assigned-complaint';
import { ConstantsServiceProvider } from '../../providers/constants-service/constants-service';
import { ComplainStatusProvider } from '../../providers/complain-status/complain-status';

@NgModule({
  declarations: [
    AssignedComplaintPage,
  ],
  imports: [
    IonicPageModule.forChild(AssignedComplaintPage),
  ],
  providers:[ConstantsServiceProvider,ComplainStatusProvider]
})
export class AssignedComplaintPageModule {}
