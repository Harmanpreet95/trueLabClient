import { Component } from '@angular/core';
import { NavController,NavParams, ViewController} from 'ionic-angular';
import { SchedulePage } from '../schedule/schedule';



@Component({
  selector: 'page-testmodal',
  templateUrl: 'testmodal.html'
})
export class TestmodalPage {
  
  public fasting='';
  public testname='';
 constructor( public navCtrl: NavController, public viewCtrl: ViewController,public navparams:NavParams) {
this.testmodel();
 }

testmodel()
{
  //alert('testmodel');
  this.fasting = this.navparams.get('fasting_detail');
  console.log(this.fasting);
  this.testname = this.navparams.get('Testname');
  console.log(this.testname);
}


dismiss() {
    this.viewCtrl.dismiss(SchedulePage);
}
    
}
 












   
      