  import { Component } from '@angular/core';
  import { NavController,NavParams, ModalController } from 'ionic-angular';
  import {Http, Headers, RequestOptions} from '@angular/http';
  import {LoadingController} from 'ionic-angular';
  import 'rxjs/add/operator/map';
  import { Appsetting } from '../../providers/appsetting';
  import { HistoryviewPage } from '../historyview/historyview';
  import { ViewPage } from '../view/view';
  import { ReportsPage } from '../reports/reports';
  import { DatePipe } from '@angular/common';
  import { ToastController } from 'ionic-angular';
  import { TestlistPage } from '../testlist/testlist';
  @Component({
    selector: 'page-history',
    templateUrl: 'history.html'

  })
  export class HistoryPage {
    public data='';
    public User_id='';
    public showdate:any;
    public errorValue = '';
      public searchList = '';
      public name='';
      public resp:any;
      dPipe = new DatePipe('en-US');

  public loading=this.loadingCtrl.create({
    content: 'Please wait...'
  })
  constructor( public navCtrl: NavController,public toastCtrl: ToastController, public modalCtrl: ModalController,public http:Http,public loadingCtrl:LoadingController,public navparams:NavParams,public appsetting:Appsetting) {
    this.resendrequest();
  }
  serializeObj(obj) {
      var result = [];

      for (var property in obj)
          result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

      return result.join("&");
  }

  resendrequest()
  {
  // this.showdate= new Date();
  this.showdate = this.dPipe.transform(new Date(), 'yyyy-MM-dd  HH:mm:ss');
  console.log(this.showdate);
    this.User_id=localStorage.getItem('USERID');
    // alert('arvinder');
    
    console.log(this.User_id);
    let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
      let options= new RequestOptions({ headers: headers });
      var url:string = this.appsetting.myGlobalVar+'users/clienthistory';

      var data1=  {
        id:this.User_id
      }
      var serialized = this.serializeObj(data1);
  console.log(serialized);   
      this.http.post(url, serialized, options).map(res=>res.json()).subscribe(data=>{
  this.loading.dismiss();

  this.errorValue = '2'; 
  if(data.error == 1){
    // alert(data.msg);

    let toast = this.toastCtrl.create({
        message: data.msg,
        duration: 3000
      });
      toast.present();


  }else{
  this.resp=data.msg;
  console.log(this.resp);
  }

  });

  }
  ///resend button/////
  resend(user_id,test_id,patient_id,doc_id)
  {
  // alert('arvinder');
     this.navCtrl.push(TestlistPage,{test_id : patient_id});
  //   console.log(this.showdate);
  //   console.log(user_id);
  //   console.log(test_id);
  //   console.log(patient_id);
  //   let headers = new Headers();
  //     headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  //     let options= new RequestOptions({ headers: headers });
  //     var url:string = this.appsetting.myGlobalVar+'tasks/acceptdecline';

  //     var data1=  {
  //       patientid:patient_id,
  //       // date:this.showdate,
  //       testid:test_id,
  //       status:'0',
  //       doctorid:doc_id
        
  //     }
  //     var serialized = this.serializeObj(data1);
  // console.log(serialized);   
  //     this.http.post(url, serialized, options).map(res=>res.json()).subscribe(data=>{
  // this.loading.dismiss();
  // this.data=data;
  // if(data.error == 0){
  // console.log(this.data);
  // // alert("Request Submitted Successfully");

  // let toast = this.toastCtrl.create({
  //       message: 'Request Submitted Successfully.',
  //       duration: 3000
  //     });
  //     toast.present();
  // }else{
  //   // alert("Unable to process the Request!")
  // let toast = this.toastCtrl.create({
  //       message: 'Unable to process the Request!',
  //       duration: 3000
  //     });
  //     toast.present();

  // }
  // });
  }



      viewPage(date,doctorname) {
        console.log(date,doctorname);  
      let modal = this.modalCtrl.create(ViewPage,{
  schedule_date : date,
  Doctorname:doctorname
      });
      modal.present();
    }



  reports(docid)
  {
  console.log(docid);
  this.navCtrl.push(ReportsPage,{
    Doc_id:docid,
  });
  }

  ///////searh list////////

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


  }