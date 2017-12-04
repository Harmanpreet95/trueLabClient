import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,ViewController } from 'ionic-angular';
import { IntroslidePage } from '../introslide/introslide';
import {Http, Headers, RequestOptions} from '@angular/http';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Appsetting } from '../../providers/appsetting';
import { DetailsmodelPage } from '../detailsmodel/detailsmodel';
import { PatienteditPage } from '../patientedit/patientedit';
import { HomePage } from '../home/home';
import { DatePipe } from '@angular/common';
import { HistoryPage } from '../history/history';

@Component({
  selector: 'page-view',
  templateUrl: 'view.html'
})
export class ViewPage {
  dPipe = new DatePipe('en-US');
  public doctorname='';
  public Date='';
  public time='';
  public data='';
  public views = '';
  public Bitid='';
  public createddate='';
  public CreatedDate='';
  public Loading=this.loadingctrl.create({
    content: 'Please wait...'
  });

 constructor( public navCtrl: NavController,public viewCtrl:ViewController, private modalCtrl: ModalController,public http:Http,public loadingctrl:LoadingController,public navParams:NavParams,public appsetting:Appsetting) {
   this.view();
 }
//  serializeObj(obj) {
//     var result = [];

//     for (var property in obj)
//         result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

//     return result.join("&");
// }

 view()
 {
  //  alert('arvinder');
//    var store_id = this.navParams.get('res_id');
//    this.Bitid=this.navParams.get('bitId');
//    console.log(this.Bitid);
//    console.log(store_id);
//         // this.Loading.present();
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
//     let options= new RequestOptions({ headers: headers });
//     var url:string = this.appsetting.myGlobalVar+'patients/viewpatients';

//     var data1=  {
//       id:store_id
//     }
//     var serialized = this.serializeObj(data1);
// console.log(serialized);   
//     this.http.post(url, serialized, options).map(res=>res.json()).subscribe(data=>{
// // this.Loading.dismiss();
// this.data=data;
// console.log(this.data);
// this.views=data.msg.Patient;
// console.log(this.views);
this.doctorname=this.navParams.get('Doctorname');
console.log(this.doctorname);


this.CreatedDate=this.navParams.get('schedule_date');
console.log(this.CreatedDate);

///////////////date//////////
this.Date = this.dPipe.transform(this.CreatedDate, 'yyyy-MM-dd');
  console.log(this.Date);
////////time////////////
this.time = this.dPipe.transform(this.CreatedDate, 'HH:mm:ss');
  console.log(this.time);

   //alert('hello');

//  });
}

dismiss() {
    this.viewCtrl.dismiss(HistoryPage);
}


  //  introslidePage(){
  // this.navCtrl.push(IntroslidePage);
  //   }


//     patientedit(ids)
//     {
//       console.log(ids);
// this.navCtrl.push(PatienteditPage,{
//    res_id:ids,
// });
//     }


// patientDelete(Patient_ID){
//   alert("harman");
//         alert(Patient_ID);
      
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
//     let options= new RequestOptions({ headers: headers });
//     var url:string = this.appsetting.myGlobalVar+'users/deletepatient';

//     var data1=  {
//       id:Patient_ID
//     }
//     var serialized_data = this.serializeObj(data1);
// console.log(serialized_data);   
//     this.http.post(url, serialized_data, options).map(res=>res.json()).subscribe(data=>{
    
//       console.log(this.data);
//       alert("DEleted Successfully");
//       this.navCtrl.push(HomePage);
//    //alert('hello');

//  });

// }

 
}
 












   
      