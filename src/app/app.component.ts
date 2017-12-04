import { Component, ViewChild } from '@angular/core';
import {AlertController, Nav, Platform,Events  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'rxjs/add/operator/filter';
import { LoginPage } from '../pages/login/login';
import { DocsPage } from '../pages/docs/docs';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HttpModule } from '@angular/http';
import { IntroslidePage } from '../pages/introslide/introslide';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { HistoryPage } from '../pages/history/history';
import { PendingrequestPage } from '../pages/pendingrequest/pendingrequest';
import { CancelrequestPage } from '../pages/cancelrequest/cancelrequest';
import { ReportsPage } from '../pages/reports/reports';
import { DetailsmodelPage } from '../pages/detailsmodel/detailsmodel';
import { PatienteditPage } from '../pages/patientedit/patientedit';
import { TestlistPage } from '../pages/testlist/testlist';
import { TestmodalPage } from '../pages/testmodal/testmodal';
import { ModalPage } from '../pages/modal/modal';
import { SchedulePage } from '../pages/schedule/schedule';
import { Camera} from '@ionic-native/camera';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../providers/appsetting';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import { Storage, SqlStorage } from 'ionic-framework/ionic';
import { Firebase } from '@ionic-native/firebase';
import { ToastController } from 'ionic-angular';
import { ChangepwdPage } from '../pages/changepwd/changepwd';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  ag_name: any;
  public user = '';
    public value='';
    idleEndTime: number;
    KeepaliveProvider: any;
    IdleProvider: any;

      // timeout
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  // time out end
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IntroslidePage;
  public data = ''; 
  public User_ID = '';
  public role ='';
  public agencyName ='';
  pages: Array<{title: string, component: any}>;
   pages2: any;
  constructor(public platform: Platform,
  public firebase : Firebase,
  				 private idle: Idle,
           public events: Events, 
				   private keepalive: Keepalive,
           public alertCtrl: AlertController,
           public statusBar: StatusBar, public toastCtrl: ToastController,public splashScreen: SplashScreen  ,public http:Http,public appsetting : Appsetting) {
    this.initializeApp();
    // this.initPushNotification();
      // this.show_profile();
      events.subscribe('user:login', () => {
       // alert("harman event")
         // for push notifications
        this.show_profile();
      });
       
    // used for an example of ngFor and navigation
        this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'EditProfile', component: EditprofilePage },
      { title: 'History', component: HistoryPage },
      { title: 'Pending Request', component: PendingrequestPage },
      { title: 'Cancel Request', component: CancelrequestPage },
      { title: 'Logout', component: LoginPage },
      { title: 'Schedule Request', component: SchedulePage }
    ];
    this.pages2 = {
      homePage: HomePage,
      loginPage: LoginPage,
      editProfile : EditprofilePage,
      historyPage: HistoryPage,
      pendingrequestPage: PendingrequestPage,
      DocsPage : DocsPage,
      // editprofilePage: EditprofilePage,
      cancelrequestPage: CancelrequestPage,
      schedulePage: SchedulePage,
      ChangepwdPage : ChangepwdPage,
    } 
     // idle timeout
			
		 // sets an idle timeout of 5 seconds, for testing purposes.
		 idle.setIdle(180);
		 // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
		 idle.setTimeout(5);
		 // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
		 idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

		idle.onIdleEnd.subscribe(() => { 
			this.idleState = 'No longer idle.'
		    console.log(this.idleState);
			//alert(this.idleState)
		
		});
		
		idle.onTimeout.subscribe(() => {
		  this.idleState = 'Timed out!';
		  this.timedOut = true;
		 // console.log(this.idleState)
		  this.user = localStorage.getItem('USER_DATA');
		  console.log(this.user)
		    if(this.user == null){
				console.log('before reset....loggedout '+this.idleState)
				this.reset();
				//console.log('after reset.......loggedout ' +this.idleState )
			} else {
					
					 localStorage.removeItem('USER_DATA');
					//  localStorage.removeItem('user_id');
					  console.log('before reset...loggedin '+this.idleState)
					 this.reset();
					 console.log('after reset.....loggedin ' +this.idleState )
					 
					 this.nav.setRoot(this.pages2.loginPage);
          //  alert('Timed out')
              let toast = this.toastCtrl.create({
                message: 'Timed out!',
                duration: 3000,
                position : 'middle'
              });
              toast.present();

					 
			}
		});
		
		
		
		idle.onIdleStart.subscribe(() => {
			this.idleState = 'You\'ve gone idle!'
			 console.log(this.idleState)
			 // alert(this.idleState)
		});
		
		
		idle.onTimeoutWarning.subscribe((countdown) => {
				this.idleState = 'You will time out in ' + countdown + ' seconds!'
				 console.log(this.idleState);
				
		
		});

		// sets the ping interval to 15 seconds
		//keepalive.interval(15);
		//keepalive.onPing.subscribe(() => { this.lastPing = new Date() alert("keeping alive")});

		this.reset();
		
		// idle timout ends

    
	
  }
	reset() {
		this.idle.watch();
		this.idleState = 'Started.';
		this.timedOut = false;
		console.log("Reseted...")
	 }




   ////////////////
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.firebase.grantPermission(); 
      // this.initPushNotification();
    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
       serializeObj(obj) {
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}

  show_profile(){
    this.User_ID = localStorage.getItem("USERID");
   var data_all = {
            id : this.User_ID
           }
   
    var serialized_all = this.serializeObj(data_all); 
    console.log(serialized_all);
    let headers = new Headers();
    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
   // var url:string = 'http://rakesh.crystalbiltech.com/truelab/api/users/registration';
 var url:string = this.appsetting.myGlobalVar+'users/userinfo';
this.http.post(url, serialized_all, options).map(res=>res.json()).subscribe(data=>{
  //alert("profile")
  console.log(data);
  if(data.error == 0){
     console.log(data);
     console.log(data.msg.User);
     localStorage.setItem("agencyName", data.msg.User.agencyname);
     this.agencyName =localStorage.getItem("agencyName"); 
     console.log("Agency -> "+this.agencyName)
     var USER = data.msg.User;
     this.data = data.msg.User;
     console.log("harman")
     console.log(this.data);

    
  }else{
    alert("TRY AGAIN!");
  }
});
}

// getnotification(){
//   this.firebase.onNotificationOpen()
//             .subscribe((res) => {
// 				alert(res);
//                 if (res.tap) {
//                     // if application open, show popup
// 				let confirmAlert = this.alertCtrl.create({
// 					title: '<center>' + res.title + '</center>',
// 					message: '<center>' + res.message + '</center>',
// 					buttons: [{
// 						text: 'Ignore',
// 						role: 'cancel'
// 					}, {
// 						text: 'View',
// 						handler: () => {
// 							//TODO: Your logic here
// 							alert(res.message);
//         this.value=res.message;
//           if(this.value == "A new test has been accepted" || this.value == "A test has been reschduled by the user" || this.value == "A test has been reschduled by the patient"){
//               //alert('arvinder');
//                 this.nav.push(SchedulePage);
//             }
//             else if(this.value == "A new test has been cancelled by the patient") {

//               //alert('cancel request');

//               this.nav.push(CancelrequestPage);
//             }
//             else if(this.value == "Your Test has been assign to the Phlebotomist")
//             {
//               //alert('done');
//               this.nav.push(PendingrequestPage);
//             }
//             else if(this.value == "A New Patient add by Super Admin, Please check")
//             {
//             //  alert('new patient add ');
//               this.nav.push(HomePage);
//             }
//             else{
//              // alert('invalid request');
//               this.nav.push(LoginPage);
//             }

// 						}
// 					}]
// 				});
// 				confirmAlert.present();
//                     // this else if is for foreground mode
//                 } else if (!res.tap) {
//                     //this.navCtr.push(Page)
// 					alert(res);
// 					let confirmAlert = this.alertCtrl.create({
// 					title: '<center>' + res.title + '</center>',
// 					message: '<center>' + res.message + '</center>',
// 					buttons: [{
// 						text: 'Ignore',
// 						role: 'cancel'
// 					}, {
// 						text: 'View',
// 						handler: () => {
// 							//TODO: Your logic here
// 							this.user = localStorage.getItem('current_user');
// 							alert('user' + this.user)
// 							if (this.user == undefined || this.user == null) {
// 								//this.nav.push(SigninPage, {message: data.message});
// 							} else {

// 								this.nav.push(HomePage, { message: res.message }); //this.nav.setRoot(this.pages2.SchedulePage);
// 							}

// 						}
// 					}]
// 				});
// 				confirmAlert.present();
//                 }
//             });
//  }

}
