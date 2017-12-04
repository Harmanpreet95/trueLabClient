import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule }   from '@angular/forms';	
import {Push } from "@ionic-native/push";
import { Appsetting } from '../providers/appsetting';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/filter';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DocsPage } from '../pages/docs/docs';
import { ListPage } from '../pages/list/list';
import { IntroslidePage } from '../pages/introslide/introslide';
import { LoginPage } from '../pages/login/login';
import { SignupagentPage } from '../pages/signupagent/signupagent';  //signupagent
import { SignupPage } from '../pages/signup/signup';
import { ChooserolePage } from '../pages/chooserole/chooserole';
import { ViewPage } from '../pages/view/view';
import { ForgotpwPage } from '../pages/forgotpw/forgotpw';
import { ModalPage } from '../pages/modal/modal';
import { ReportsPage } from '../pages/reports/reports';
import { TestlistPage } from '../pages/testlist/testlist';
import { DetailsmodelPage } from '../pages/detailsmodel/detailsmodel';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { Camera } from '@ionic-native/camera';
import { HistoryPage } from '../pages/history/history';
import { PendingrequestPage } from '../pages/pendingrequest/pendingrequest';
import { CancelrequestPage } from '../pages/cancelrequest/cancelrequest';
import { ResonmodelPage } from '../pages/resonmodel/resonmodel';
import { PatienteditPage } from '../pages/patientedit/patientedit';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SchedulePage } from '../pages/schedule/schedule';
import { TestmodalPage } from '../pages/testmodal/testmodal';
import { ChangepwdPage } from '../pages/changepwd/changepwd';
// import { historymodalPage } from '../pages/historymodal/historymodal';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { SignaturePadModule } from 'angular2-signaturepad';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Firebase } from '@ionic-native/firebase';
// import {Platform, Page} from 'ionic-framework/ionic';
// import { MaterialModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { File } from '@ionic-native/file';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DocsPage,
    IntroslidePage,
    LoginPage,
    SignupPage,
    ReportsPage,
    ViewPage,
    TestlistPage,
    DetailsmodelPage,
    EditprofilePage,
    HistoryPage,
    PendingrequestPage,
    CancelrequestPage,
    ResonmodelPage,
    ForgotpwPage,
    PatienteditPage,
    SchedulePage,
    TestmodalPage,
    ModalPage,
    SignupagentPage,
    ChooserolePage,
    ChangepwdPage,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
   FormsModule,
       MomentModule,
       
    // MaterialModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    IonicModule.forRoot(MyApp),
    SignaturePadModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DocsPage,
    ListPage,
    IntroslidePage,
    LoginPage,
    SignupPage,
    ReportsPage,
    ViewPage,
    TestlistPage,
    DetailsmodelPage,
    EditprofilePage,
    HistoryPage,
    PendingrequestPage,
    CancelrequestPage,
    ResonmodelPage,
    ForgotpwPage,
    PatienteditPage,
    SchedulePage,
    TestmodalPage,
    ModalPage,
    SignupagentPage,
    ChooserolePage,
    ChangepwdPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Appsetting,
    Camera,
    Push,
    File,
    Transfer,
    Firebase,
    // InAppBrowser,
 
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
