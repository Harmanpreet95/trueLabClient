import { Component } from '@angular/core';
import { NavController, ModalController,Events  } from 'ionic-angular';
import { IntroslidePage } from '../introslide/introslide';
import { ViewPage } from '../view/view';
import {Http, Headers, RequestOptions} from '@angular/http';
import { LoadingController, AlertController } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import { TestlistPage } from '../testlist/testlist';
import { DetailsmodelPage } from '../detailsmodel/detailsmodel';
import { ReportsPage } from '../reports/reports';
import {Camera} from 'ionic-native';
import { ToastController } from 'ionic-angular';
// import { NativeStorage } from 'ionic-native';
// import { Platform } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    public bit_id='';
    public User_ID;
    public resp:any;
    public data='';
    public items = ''; 
    public name= ''; 
    public errorValue = '';
    public searchList = '';
    public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
  });
 constructor( public navCtrl: NavController,public events: Events, public toastCtrl: ToastController,private modalCtrl: ModalController,public http:Http, public appsetting : Appsetting,public loadingCtrl:LoadingController) {
 
 // alert("harman");
  events.publish('user:login');
  //alert(localStorage.getItem("USERID"));
  this.User_ID = localStorage.getItem("USERID");
 // alert("harman2")
 // alert(this.User_ID);
this.home();
    }

     serializeObj(obj) {
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}
home(){
    this.Loading.present();
    this.bit_id="2";
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options= new RequestOptions({ headers: headers });
    var url:string = this.appsetting.myGlobalVar + 'users/clientpatientlist';
    // console.log(this.local.get('USERID'));
    var data_all = {

            id : this.User_ID 
    }
    var serialized = this.serializeObj(data_all);
    this.http.post(url,serialized, options).map(res=>res.json()).subscribe(data=>{

    // alert("homepage")
    this.data=data;
   console.log(this.data);
   if(data.error == 0){
     this.Loading.dismiss();
     this.resp=data.msg;
    this.errorValue = '2';
    
    
   }else{
         this.Loading.dismiss();
    //  alert("No DATA AVAILABLE");
     let toast = this.toastCtrl.create({
      message: "No DATA AVAILABLE",
      duration: 3000
    });
    toast.present();
   }
      },error => {
  this.Loading.dismiss();
        // alert('error');
        alert(error);
        console.log('Error: ' + error);
      }
);
}
// viewPage(id,bitid)
// {
//   console.log(id,bitid);
//   this.navCtrl.push(ViewPage,{
//     res_id:id,
//     bitId:bitid
//   });
// }
testlist(ids)
{
  console.log(ids);
  this.navCtrl.push(TestlistPage,{
    test_id:ids,
  });
}
reports(docid)
{
console.log(docid);
this.navCtrl.push(ReportsPage,{
  Doc_id:docid,
});
}
// detailsmodelPage()
// {
//   this.navCtrl.push(DetailsmodelPage);
// }

//   introslidePage(){
//   // console.log("clicked")
//  let Aboutmodal = this.modalCtrl.create(IntroslidePage);
//  Aboutmodal.present();
setFilteredItems(){
  console.log('Working');
  // if(this.myInput == '') {
  //   this.ListScheduledPatients();
  // } else {
  //  this.resp = this.filterItems(this.name);
  // }
  
    if(this.name.length == 0) {
   // this.ListScheduledPatients();
    console.log('plz write something');
    
    this.errorValue = '2'; 
    console.log(this.errorValue);
  } else {

   this.searchList = this.filterItems(this.name);
   console.log('Filtering');
   this.errorValue = '0';
   console.log(this.errorValue);
  }
 }
  
  
 public filterItems(searchTerm){
 
        return this.resp.filter((hero) => {
            return hero.Patient.trackingid.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     
 
    }
  
//  ionViewDidLoad() {
//        // this.setFilteredItems();
 
//         this.searchControl.valueChanges.debounceTime(100).subscribe(search => {
 
//             this.setFilteredItems();
 
//         });
 
// }
 












   
}