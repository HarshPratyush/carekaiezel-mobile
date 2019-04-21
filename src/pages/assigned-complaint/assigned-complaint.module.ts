import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignedComplaintPage } from './assigned-complaint';

@NgModule({
  declarations: [
    AssignedComplaintPage,
  ],
  imports: [
    IonicPageModule.forChild(AssignedComplaintPage),
  ],
})
export class AssignedComplaintPageModule {}
