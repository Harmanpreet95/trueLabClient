import { Component } from '@angular/core';
import { NavController,NavParams, ViewController} from 'ionic-angular';
import { SchedulePage } from '../schedule/schedule';
import {Http, Headers, RequestOptions} from '@angular/http';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Appsetting } from '../../providers/appsetting';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  dPipe = new DatePipe('en-US');
  public scheduledate='';
  public selectedDate='';
    public loading=this.loadingCtrl.create({

content: 'Please wait...'
  });
public patientlist='';
public errorValue='';
public time='';
 constructor( public navCtrl: NavController, public viewCtrl: ViewController,public navparams:NavParams,public http:Http,public appsetting:Appsetting,public loadingCtrl:LoadingController) {
this.modalpage();
 }


modalpage()
{
  
 this.scheduledate = this.navparams.get('schedule_date');
  console.log(this.scheduledate);
  this.selectedDate = this.dPipe.transform(this.scheduledate, 'yyyy-MM-dd');
  console.log(this.selectedDate);

  this.time = this.dPipe.transform(this.scheduledate, 'HH:mm:ss');
  console.log(this.time);

}

dismiss() {
    this.viewCtrl.dismiss(SchedulePage);
}
    
}
 












   
      