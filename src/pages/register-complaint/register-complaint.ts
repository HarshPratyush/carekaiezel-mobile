import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ActionSheet } from 'ionic-angular';
import LocationPicker from "location-picker";
import { ComplainStatusProvider } from '../../providers/complain-status/complain-status';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
/**
 * Generated class for the RegisterComplaintPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-register-complaint',
  templateUrl: 'register-complaint.html',
})
export class RegisterComplaintPage {

  actionSheet:ActionSheet;
  allProducts:any[]=[];
  selectedCategory;

  complaintSubmissionModel:ComplaintSubmissionModel={
    address:'',
    breakDownFrom:null,
    description:'',
    image:'',
    latitude:0,
    longitude:0,
    product:0,
    breakDownFromAt:null
  };

  currentDate:string;
  locationPicker: LocationPicker;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,private complainService:ComplainStatusProvider,
    private camera: Camera,private utilService:UtilServiceProvider) {
      this.currentDate=new Date().toISOString()
      setTimeout(() => {
        this.intializePicker();
    }, 2000);
  }

  ngOnInit(){
    this.getAllProducts();
  }
  ionViewDidLoad() {
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
      this.complaintSubmissionModel.image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
    console.log(err)
     });
  }

  async getAllProducts(){
    this.allProducts = await this.complainService.getAllProducts() as any;
  }

  intializePicker() {
    
    this.locationPicker = new LocationPicker('map', {
      setCurrentPosition:  true, // You can omit this, defaults to true
  }, {
          zoom: 15 // You can set any google map options here, zoom defaults to 15
      });
      // navigator.geolocation.getCurrentPosition(d=>{
      //   this.locationPicker.se(d.coords.latitude,d.coords.longitude)
      // });

    google.maps.event.addListener(this.locationPicker.map, 'idle', (event) => {
        // Get current location and show it in HTML
          let locationData = this.locationPicker.getMarkerPosition()
      this.complaintSubmissionModel.latitude=locationData.lat;
      this.complaintSubmissionModel.longitude=locationData.lng;

    });
}

  imageClicked()
  {
  
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
  
  
    this.actionSheet.present();
  }

  async registerComplaint()
  {
    if(!this.complaintSubmissionModel.breakDownFrom){
      this.utilService.showToast('Select Break Down Date');
    }

    else if(!this.complaintSubmissionModel.description)
    {
      this.utilService.showToast('Please provide some description');
    }

    else if(!this.selectedCategory)
    {
      this.utilService.showToast('Please select product category');
    }
    else if(!this.complaintSubmissionModel.product)
    {
      this.utilService.showToast('Please select a product')
    }

    else if(!this.complaintSubmissionModel.address)
    {
      this.utilService.showToast('Please provide address');
    }

    else if(!this.complaintSubmissionModel.latitude)
    {
      this.utilService.showToast('Please provide latitude');
    }

    else
    {
      let responseData:any =await this.complainService.registerComplaint(this.complaintSubmissionModel);

      this.utilService.showToast(responseData.message).then(d=>{
        if(responseData.statusCode==200)
        {
          this.navCtrl.setRoot('ComplainStatusPage')
        }
      });
      }
      
  }

}
