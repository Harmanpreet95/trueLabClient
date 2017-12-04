import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { IntroslidePage } from '../introslide/introslide';
import { Appsetting } from '../../providers/appsetting';
import {Http, Headers, RequestOptions} from '@angular/http';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-detailsmodel',
  templateUrl: 'detailsmodel.html'
})
export class DetailsmodelPage {
  public User_id='';
public data={};
public Loading=this.loading.create({
    content: 'Please wait...'
  });
 constructor( public navCtrl: NavController, public toastCtrl: ToastController,private modalCtrl: ModalController,public http:Http,public loading:LoadingController,public appsetting:Appsetting) {

 }
 
  serializeObj(obj) {
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}

 details(detail){
   this.User_id=localStorage.getItem('USERID');
   console.log(this.User_id);
   console.log('hello')
     this.Loading.present();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
    var url:string = this.appsetting.myGlobalVar+'patients/addpatients';

// if(detail.value.check == true)
// {
 var data1= {

            name:detail.value.name,
            address:detail.value.address,
            phonenumber:detail.value.number,
            dob:detail.value.dob,
            doctorname:detail.value.doctorsname,
            doctornumber:detail.value.doctornumber,
            doctorfaxnumber:detail.value.DoctorsFaxNumber,
            doctorid: this.User_id,
            agencynumber :detail.value.agencynumber,
            agencyname : detail.value.agencyname
      


   }
    var serialized = this.serializeObj(data1);
    console.log(serialized);   
    this.http.post(url, serialized, options).map(res=>res.json()).subscribe(data=>{
    this.Loading.dismiss();
    this.data=data;

if(data.error == 0)
{
// alert(data.msg);
let toast = this.toastCtrl.create({
      message: data.msg,
      duration: 3000
    });
    toast.present();
console.log(data);
this.navCtrl.push(HomePage);

}else 
{
// alert(data.msg);
let toast = this.toastCtrl.create({
      message: data.msg,
      duration: 3000
    });
    toast.present();
}

});
   

}
// else
// {
//  var data1= {

//             name:detail.value.name,
//             address:detail.value.address,
//             phonenumber:detail.value.number,
//             dob:detail.value.dob,
//             doctorname:detail.value.doctorsname,
//             doctornumber:detail.value.doctornumber,
//             doctorfaxnumber:detail.value.DoctorsFaxNumber,
//             doctorid: this.User_id,
//             fasting:0


//    }
//     var serialized = this.serializeObj(data1);
// console.log(serialized);   
//     this.http.post(url, serialized, options).map(res=>res.json()).subscribe(data=>{
// this.Loading.dismiss();
// this.data=data;

// if(data.error == 0)
// {
// alert(data.msg);
// console.log(data);

// }
// else 
// {
// alert(data.msg);
// }

// });
  
// }



home()
{
    this.navCtrl.push(HomePage);
}

    
}
 












   
      