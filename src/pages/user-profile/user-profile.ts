import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ActionSheet } from 'ionic-angular';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
    private actionSheetCtrl: ActionSheetController,private userServiceProvide:UserServiceProvider,
    private fb: FormBuilder,private camera: Camera) {
  
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

    if(this.userProfile.profilePhoto)
    {
      this.userProfile.profilePhoto='data:image/jpeg;base64,'+this.userProfile.profilePhoto;
    }

  }

  imageUploadNew()
  {

    
const options: CameraOptions = {
  quality: 50,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

    this.camera.getPicture(options).then((imageData) => {
      this.userProfile.profilePhoto = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
    console.log(err)
     });
  }

  imageClicked()
  {
    if(this.userProfile.profilePhoto)
    {
    this.actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.imageUploadNew();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
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
            this.imageUploadNew();
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
  if(!this.userProfile.firstName)
    {
      this.utilService.showToast('Provide First Name')
    }

    else if(!this.userProfile.lastName)
    {
      this.utilService.showToast('Provide Last Name')
    }


    else if(!this.userProfile.contactNo )
    {
      this.utilService.showToast('Provide Contact No.')
    }

    else
    await this.userServiceProvide.update(this.userProfile)
  }
}
