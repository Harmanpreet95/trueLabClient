import { Component } from '@angular/core';
import { NavController,NavParams, ModalController, Platform } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {
  appclientdownloadreport: any;
  pdf: any;
  public data = '';
  public resp='';
 public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
  });
 constructor( public navCtrl: NavController, public toastCtrl: ToastController, public platform : Platform,private modalCtrl: ModalController,public navParams:NavParams,public http:Http,public appsetting:Appsetting,public loadingCtrl:LoadingController) {
this.reportpage();
 }
 serializeObj(obj) {
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}


 
reportpage()
{
  
  var Docid=this.navParams.get('Doc_id');
  console.log(Docid);
   this.Loading.present();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
    var url:string = this.appsetting.myGlobalVar+'patients/viewpatients';

    var data1=  {
      id:Docid
    }
    var serialized = this.serializeObj(data1);
console.log(serialized);  
 this.http.post(url, serialized, options).map(res=>res.json()).subscribe(data=>{
this.Loading.dismiss();
this.data=data;
if(data.msg1 == ''){
    let toast = this.toastCtrl.create({
      message: 'No Reports Yet!',
      duration: 3000,
      position : 'middle'
    });
    toast.present();
}else{
console.log(this.data);
this.resp=data.msg1;
console.log(this.resp);
 }
});
}
 launch(urlen,pid) {
  //  alert(pid);
   let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
    var url:string = this.appsetting.myGlobalVar+'patients/clientdownloadreportfromapp';

    var data1=  {
      id:pid,
      status : 1
    }
      var serialized = this.serializeObj(data1);
      console.log(serialized);  
      this.http.post(url, serialized, options).map(res=>res.json()).subscribe(data=>{
      this.Loading.dismiss();
      console.log(this.data);
      console.log(data.error);
      this.reportpage()
      // this.appclientdownloadreport = data.appclientdownloadreport;
      // this.data=data;
 
    })
         this.platform.ready().then(() => {
      open(urlen, "_system");
      console.log("link viewed");
  });
  //  alert('jdshvfd')



}
}



 












   
      