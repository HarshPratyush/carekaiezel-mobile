import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplainDetailsPage } from './complain-details';

@NgModule({
  declarations: [
    ComplainDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplainDetailsPage),
  ],
})
export class ComplainDetailsPageModule {}
