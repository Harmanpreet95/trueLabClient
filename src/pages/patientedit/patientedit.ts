import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import {Http, Headers, RequestOptions} from '@angular/http';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
import { ViewPage } from '../view/view';

/**
 * Generated class for the PatienteditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-patientedit',
  templateUrl: 'patientedit.html',
})
export class PatienteditPage {
  public selected:any;
    public usr = '';
    public valueOFCheckbox : any;
    public Fast = '';
  public data='';
  public views='';
  public loading=this.loadingctrl.create({
    content: 'Please wait...'
  });

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingctrl:LoadingController, public http:Http,public appsetting:Appsetting) {
    this.patientedit();
  }


  serializeObj(obj) {
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}
datachange(e:any){
  // alert("event");
  console.log("EVENT");
  console.log(e.checked);
  this.valueOFCheckbox = e.checked
}
patientedit()
{
  
  var Patient_id = this.navParams.get('res_id');
  console.log(Patient_id);
  
  // this.loading.present();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
    var url:string = this.appsetting.myGlobalVar+'patients/viewpatients';

    var data1=  {
      id:Patient_id
    }
    var serialized = this.serializeObj(data1);
    console.log(serialized);   
    this.http.post(url, serialized, options).map(res=>res.json()).subscribe(data=>{
// this.loading.dismiss();
    // alert(data.msg.Patient.fasting);
// if(data.msg.Patient.fasting == 1){
//   this.selected = true;
//   console.log("fasting value is" +  this.selected);
// }else{
// this.selected = false;
// console.log("fasting value is" +  this.selected);
// }
// this.Fast = data.msg.Patient.fasting;
this.data=data;
console.log(this.data);
 this.data=data.msg.Patient;

});

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad PatienteditPage');
  // }
  
}

editPatientDetails(detailmodel){


  var Patient_id = this.navParams.get('res_id');
  console.log(Patient_id);
  // this.loading.present();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
    var url:string = this.appsetting.myGlobalVar+'patients/editpatientprofile';

    var data_Patient =  {

      id:Patient_id,
      name : detailmodel.value.name,
      address : detailmodel.value.address,
      dob : detailmodel.value.dob,
      doctorname : detailmodel.value.doctorname,
      doctornumber : detailmodel.value.doctornumber,
      doctorfaxnumber : detailmodel.value.doctorfaxnumber,
      phonenumber : detailmodel.value.phonenumber,
      fasting : 1

    }
    console.log(data_Patient);
      var serialized = this.serializeObj(data_Patient);
      console.log(serialized);   
      this.http.post(url, serialized, options).map(res=>res.json()).subscribe(data=>{
      // this.loading.dismiss();
      this.navCtrl.push(HomePage);
});

// }else{
//   alert("false");
//   var Patient_id = this.navParams.get('res_id');
//   console.log(Patient_id);
//   // this.loading.present();
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
//     let options= new RequestOptions({ headers: headers });
//     var url:string = this.appsetting.myGlobalVar+'patients/editpatientprofile';

//     var data_Patient =  {

//       id:Patient_id,
//       name : detailmodel.value.name,
//       address : detailmodel.value.address,
//       dob : detailmodel.value.dob,
//       doctorname : detailmodel.value.doctorname,
//       doctornumber : detailmodel.value.doctornumber,
//       doctorfaxnumber : detailmodel.value.doctorfaxnumber,
//       phonenumber : detailmodel.value.phonenumber,
//       fasting : 0

//     }
//       var serialized = this.serializeObj(data_Patient);
//       console.log(serialized);   
//       this.http.post(url, serialized, options).map(res=>res.json()).subscribe(data=>{
//       // this.loading.dismiss();
//       this.navCtrl.push(HomePage);
// });

// }
}

home()
{
  this.navCtrl.push(HomePage);
}


}