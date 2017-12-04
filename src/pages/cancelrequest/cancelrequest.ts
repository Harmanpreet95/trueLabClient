import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ViewPage } from '../view/view';
import { ReportsPage } from '../reports/reports';
import { TestlistPage } from '../testlist/testlist';
import { ResonmodelPage } from '../resonmodel/resonmodel';
import {Http, Headers, RequestOptions} from '@angular/http';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Appsetting } from '../../providers/appsetting';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-cancelrequest',
  templateUrl: 'cancelrequest.html'
})
export class CancelrequestPage {
  public resp:any;
  public name='';
  public errorValue='';
  public searchlist='';
  public loading=this.loadingCtrl.create({
    content: 'Please wait...'
  });

 constructor( public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController,public modalCtrl: ModalController,public http:Http,public loadingCtrl:LoadingController,public appsetting:Appsetting) {
  
this.cancelrequest();
 }
  serializeObj(obj) {
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}
 cancelrequest()
 {
  //  alert('Cancel Request');
var User_id=localStorage.getItem('USERID');
console.log( User_id);
this.loading.present();
let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
    var url:string = this.appsetting.myGlobalVar+'patients/doctorcanceledpatientlist';

    var data1={
      id:User_id
    }
      var serialized = this.serializeObj(data1);
     this.http.post(url,serialized, options).map(res=>res.json()).subscribe(data=>{
    this.loading.dismiss();
    if(data.error == 1){
      // alert(data.msg);
      let toast = this.toastCtrl.create({
      message: data.msg,
      duration: 3000
    });
    toast.present();
    }else{
    console.log(data.msg);
    this.resp=data.msg;
    this.errorValue = '2'; 
    console.log(this.resp);
    }
 
 });
 }
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

   this.searchlist = this.filterItems(this.name);
   console.log('Filtering');
   this.errorValue = '0';
   console.log(this.errorValue);
  }
 }
  
  
 public filterItems(searchTerm){
 
        return this.resp.filter((hero) => {
            return hero.Patient[0].trackingid.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     
 
    }



   viewPage(){
  this.navCtrl.push(ViewPage);
    }

    reportsPage(){
  this.navCtrl.push(ReportsPage);
    }

     testlistPage(){
  this.navCtrl.push(TestlistPage);
    }

  resonmodelPage(reason){
    console.log(reason);
      let Aboutmodal = this.modalCtrl.create(ResonmodelPage,{
       Reason:reason
      });
      Aboutmodal.present();
 }

 showAlert(reason) {
    let alert = this.alertCtrl.create({
      title: 'Reason For Cancel',
      subTitle: reason,
      cssClass: reason,
      buttons: ['OK']
    });
    alert.present();
  }

 

}