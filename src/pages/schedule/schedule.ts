import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ViewPage } from '../view/view';
import { ModalPage } from '../modal/modal';
import { TestmodalPage } from '../testmodal/testmodal';
import {Http, Headers, RequestOptions} from '@angular/http';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Appsetting } from '../../providers/appsetting';
import { DetailsmodelPage } from '../detailsmodel/detailsmodel';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  public loading=this.loadingCtrl.create({
    content:'please wait..'
  });
public errorValue='';
public patientlist:any;
public list='';
public name='';
public searchList='';

 constructor( public navCtrl: NavController, public modalCtrl: ModalController,public toastCtrl: ToastController,public appsetting:Appsetting,public loadingCtrl:LoadingController,public http:Http) {
   this.ListScheduledPatients();
 }
serializeObj(obj) {
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}
public ListScheduledPatients() {
  //alert('schedule');
  this.loading.present();
  var user_id = localStorage.getItem('USERID');
  console.log(user_id);
   var postdata = { id : user_id }
      var serialized = this.serializeObj(postdata); 
      console.log(serialized);
      let headers = new Headers();
      headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
      let options= new RequestOptions({ headers: headers });
      var url:string = this.appsetting.myGlobalVar+'patients/clientscheduledlist';
      this.http.post(url, serialized, options).map(res=>res.json()).subscribe(data=>{
    
      console.log(data);
      this.patientlist=data.msg;
      console.log(this.patientlist);
      this.loading.dismiss();
      if(data.error == 0){
       this.patientlist=data.msg;
     console.log(this.patientlist);
     this.errorValue = '2';
     console.log(this.errorValue);
      
      }else{
       
     this.errorValue = '1'
     console.log(this.errorValue);
    //  alert(data.msg);
     let toast = this.toastCtrl.create({
      message: data.msg,
      duration: 3000
    });
    toast.present();
     
      }
      });
  
  
 }
 detailsmodelPage()
{
  this.navCtrl.push(DetailsmodelPage);
}


 viewPage(ids){
  this.navCtrl.push(ViewPage,{
res_id:ids
    });
 }  


     presentModal(ids) {
       console.log(ids);  
    let modal = this.modalCtrl.create(ModalPage,{
 schedule_date : ids
    });
    modal.present();
  }

   presentsModal(fasting,testname) {
     console.log(fasting);
     console.log(testname);
    let modal = this.modalCtrl.create(TestmodalPage,{
      fasting_detail : fasting,
      Testname : testname
    });
    modal.present();
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

   this.searchList = this.filterItems(this.name);
   console.log('Filtering');
   this.errorValue = '0';
   console.log(this.errorValue);
  }
 }
  
  
 public filterItems(searchTerm){
 
        return this.patientlist.filter((hero) => {
            return hero.Patient.trackingid.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     
 
    }

}
   
   













   
      