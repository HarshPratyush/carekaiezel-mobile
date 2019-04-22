import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ActionSheet } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import LocationPicker from "location-picker";
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
    longitutde:0,
  };
  locationPicker: LocationPicker;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,private datePicker: DatePicker) {
      setTimeout(() => {
        this.intializePicker();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterComplaintPage');
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
      this.complaintSubmissionModel.longitutde=locationData.lng;

    });
}


  openCalendarBreakDownDate()
  {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      maxDate:new Date(),
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => this.complaintSubmissionModel.breakDownFrom=date,
      err => console.log('Error occurred while getting date: ', err)
    );
  }


  imageClicked()
  {
  
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
  
  
    this.actionSheet.present();
  }

}
