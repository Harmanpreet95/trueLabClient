import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ViewPage } from '../view/view';
import { ReportsPage } from '../reports/reports';
import { TestlistPage } from '../testlist/testlist';
import { DetailsmodelPage } from '../detailsmodel/detailsmodel';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { TestmodalPage } from '../testmodal/testmodal';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-pendingrequest',
  templateUrl: 'pendingrequest.html'
})
export class PendingrequestPage {
  public User_ID='';
  public searchList='';
  public errorValue='';
  public name='';
  public resp:any;
  public data='';
  public loading=this.loadingCtrl.create({
     content: 'Please wait...'
  });
 constructor( public navCtrl: NavController, public toastCtrl: ToastController,public modalCtrl: ModalController,public appsetting:Appsetting,public loadingCtrl:LoadingController,public http:Http) {
 this.pendingrequest();
 }
 serializeObj(obj) {
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}


 
pendingrequest()
{

  this.User_ID = localStorage.getItem("USERID");
  console.log(this.User_ID);
  //alert('arvinder');
  // var Docid=this.navParams.get('Doc_id');
  //console.log(Docid);
   this.loading.present();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
    var url:string = this.appsetting.myGlobalVar+'patients/clientpendinglist';

    var data1=  {
      id:this.User_ID
      // id:16
    }
    var serialized = this.serializeObj(data1);
console.log(serialized);  
 this.http.post(url, serialized, options).map(res=>res.json()).subscribe(data=>{
this.loading.dismiss();
console.log(data);
if(data.error == 1)
{
// alert("No PENDING REQUESTS YET!");
let toast = this.toastCtrl.create({
      message: 'NO PENDING REQUESTS YET!',
      duration: 3000
    });
    toast.present();
}else{
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

   viewPage(id){
  this.navCtrl.push(ViewPage,{
   res_id:id,
  });
    }

    reportsPage(ids){
  this.navCtrl.push(ReportsPage,{
     Doc_id:ids,
  });
    }

     testlistPage(Id){
  this.navCtrl.push(TestlistPage,{
    test_id:Id,
  });
    }

  detailsmodelPage(){
      let Aboutmodal = this.modalCtrl.create(DetailsmodelPage);
      Aboutmodal.present();
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
 

}