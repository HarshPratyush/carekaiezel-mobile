import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ActionSheet } from 'ionic-angular';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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

  userProfileGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,private utilService:UtilServiceProvider,
    private actionSheetCtrl: ActionSheetController,private userServiceProvide:UserServiceProvider,private fb: FormBuilder) {
  
      this.userProfileGroup = this.fb.group({
        firstName: new FormControl('', [Validators.required]),
        middleName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.email,Validators.required]),
        contactNo:new FormControl('', [Validators.required,Validators.pattern(/^([0-9]{10,11})$/)])

      });
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
