import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ActionSheet } from 'ionic-angular';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  userProfile:ProfieModel;
  actionSheet:ActionSheet;
  constructor(public navCtrl: NavController, public navParams: NavParams,private utilService:UtilServiceProvider,
    private actionSheetCtrl: ActionSheetController,private userServiceProvide:UserServiceProvider) {
  }

  ionViewDidLoad() {
  }

  ngOnInit(){
    this.utilService.setUserDetails();
    this.userProfile=this.utilService.getUserDetails().sessionMap.user;

  }

  imageClicked()
  {
    if(this.userProfile.image)
    {
    this.actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            console.log('Remove clicked');
          }
        },{
          text: 'Edit',
          handler: () => {
            console.log('Edit clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
  }
  else{
    this.actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
      {
          text: 'Upload Image',
          handler: () => {
            console.log('Upload clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
  }
  
    this.actionSheet.present();
  }

  async updateProfile()
{
    await this.userServiceProvide.update(this.userProfile)
  }
}
