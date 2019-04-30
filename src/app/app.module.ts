import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ConstantsServiceProvider } from '../providers/constants-service/constants-service';
import { HttpClientModule } from '@angular/common/http';
import { UtilServiceProvider } from '../providers/util-service/util-service';
import { ComplainStatusProvider } from '../providers/complain-status/complain-status';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    MyApp  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    ConstantsServiceProvider,
    UtilServiceProvider,
    ComplainStatusProvider,
    CallNumber,
    
  ]
})
export class AppModule {}
