import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfilePage } from './user-profile';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@NgModule({
  declarations: [
    UserProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UserProfilePage),
  ],
  providers:[UtilServiceProvider]
})
export class UserProfilePageModule {}
