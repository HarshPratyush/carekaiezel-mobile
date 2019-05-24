import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ActionSheet } from 'ionic-angular';
import LocationPicker from "location-picker";
import { ComplainStatusProvider } from '../../providers/complain-status/complain-status';
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
  complaintSubmissionModel:ComplaintSubmissionModel={
    adress:'',
    breakDownFrom:new Date(),
    description:'',
    image:'',
    latitude:0,
    longitude:0,
  };
  currentDate:string;
  locationPicker: LocationPicker;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,private complainService:ComplainStatusProvider) {
      this.currentDate=new Date().toISOString()
      setTimeout(() => {
        this.intializePicker();
    }, 2000);
  }

  ionViewDidLoad() {
  }
  imageUploadNew(e)
  {
    var blob = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = ()=> {
        this.complaintSubmissionModel.image= reader.result as string;                
    }
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
            document.getElementById('image').click();
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

      await this.complainService.registerComplaint(this.complaintSubmissionModel);
  }

}
