import { Component } from '@angular/core';
import { NavController , NavParams, ModalController,ViewController } from 'ionic-angular';
import { IntroslidePage } from '../introslide/introslide';
import {Http, Headers, RequestOptions} from '@angular/http';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Appsetting } from '../../providers/appsetting';
import {CancelrequestPage} from '../cancelrequest/cancelrequest';

@Component({
  selector: 'page-resonmodel',
  templateUrl: 'resonmodel.html'
})
export class ResonmodelPage {
  public reason='';
  public resp='';
  public loading=this.loadingCtrl.create({
    content:'please wait...'
  })
 constructor( public navCtrl: NavController,public navparams:NavParams,public viewCtrl:ViewController, private modalCtrl: ModalController,public http:Http,public appsetting:Appsetting, public loadingCtrl:LoadingController) {
   this.reasonmodel();
 }
 serializeObj(obj) {
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}
reasonmodel()
{
  // alert('hit');
this.reason=this.navparams.get('Reason');
console.log(this.reason);
//   var doc_id=localStorage.getItem('USERID');
//   console.log(doc_id);
//   this.loading.present();
//   let headers=new Headers();
//   headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
//     let options= new RequestOptions({ headers: headers });
//     var url:string = this.appsetting.myGlobalVar+'patients/doctorcanceledpatientlist';

//     var data1={
//       id:doc_id
//     }
//       var serialized = this.serializeObj(data1);
//       console.log(serialized);
//       this.http.post(url,serialized,options).map(res=>res.json()).subscribe(data=>{
//     this.loading.dismiss();
//     console.log(data);
//     if(data.msg[0].StatusCancel.admin_reason == null){
//        alert("NO REASON");
//     }else{
//        this.resp=data.msg[0].StatusCancel;
//        console.log(this.resp);
//       }
//  });
}

  //  introslidePage(){
  // this.navCtrl.push(IntroslidePage);
  //   }

dismiss() {
    this.viewCtrl.dismiss(CancelrequestPage);
}
 
}
 












   
      