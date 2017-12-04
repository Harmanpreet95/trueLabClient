import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Appsetting } from '../../providers/appsetting';
import { PendingrequestPage } from '../pendingrequest/pendingrequest';
import { HomePage } from '../home/home';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-testlist',
  templateUrl: 'testlist.html'
})
export class TestlistPage {
  public requesttimeId: any;
  request_timetest: any;

  public diagonisID: any;
  public reqdateID: any;
  public requesttime : any;
  requesteddate: any; minDate;

  dPipe = new DatePipe('en-US');

  corresID: string;
  raku: any;

  text: any;
  // imageToSend: string;
  imageToSend: any;
  signature = '';
  isDrawing = false;
  public diagnosis = ''
  public checkfalse = [];
    public mytoday = [];
  public value = '';
  public data = {};
  public testid = [];
  public store_id = '';
  public check_box = '';
  public myvalue = '';
  public checkValue = [];
  public checkFast = [];
  public testID = '';
  public fastid = '';
  public UID = '';
  public qty: any = [];
  public req: any = [];
  public reqtime: any = [];
  public diag = [];
  public chkStatus = '';
  public Loading = this.loadingctrl.create({
    content: 'Please wait...'
  });
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };
  constructor(public navCtrl: NavController, public storage: Storage, public toastCtrl: ToastController, private modalCtrl: ModalController, public http: Http, public loadingctrl: LoadingController, public appsetting: Appsetting, public navParams: NavParams) {

    this.minDate = this.dPipe.transform(new Date(), 'yyyy-MM-dd');
   // this.req = [this.minDate,this.minDate];
   // console.log('initial reg' + this.req);
    this.listview();

  }
  serializeObj(obj) {
    var result = [];

    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }



  listview() {
    this.imageToSend = '';
    console.log("showimage")
    console.log(this.imageToSend)
    //alert('arvinder');
    this.store_id = this.navParams.get('test_id');
    console.log(this.store_id);
    //  var store_id = this.navParams.get('res_id');
    //  console.log(store_id);
    this.Loading.present();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    var url: string = this.appsetting.myGlobalVar + 'patients/listofalltest';

    this.http.post(url, options).map(res => res.json()).subscribe(data => {
      this.Loading.dismiss();



      console.log(data.msg);
      // return false;
      for (var i = 0; i < data.msg.length; i++) {
        console.log(data.msg.length);
        console.log(data.msg[i].Test.id);
        var value = data.msg[i].Test;
        console.log(value);
        this.myvalue = this.myvalue + value.id + ',';
      }
      console.log(this.myvalue);
      this.data = data;
      console.log(this.data);

      
      this.value = data.msg;
      console.log(this.value);

      
      // var allvalues: any = [];
      // allvalues = this.value;
      // var mindate = this.minDate;
      // this.mytoday =mindate;
      // console.log('here ->  ' + mindate)
      // var reg: any = [];
      // reg = this.req

      // allvalues.forEach(function (key, value) {
      //   console.log(key.Test.id)
      //   var id = key.Test.id
      //   console.log(mindate);
      //   reg.push(mindate);
      // });
      // this.req = reg
      // console.log(this.req)


      //  ['1992-12-23','2023-12-23']
      for (let show_data of this.value) {
        console.log("harman111")
        console.log(show_data);
      }
    });
  }










  datachanged(e: any, id) {
    console.log(e);
    console.log(e.checked);

    if (e.checked == true) {
      console.log("true");
      this.checkValue.push(id);

      console.log(this.checkValue);
      this.checkValue.toString();
      console.log("string")
      console.log(this.checkValue.toString());
      // for(let data of this.checkValue) {
      //   console.log("harman111")
      //   console.log(data)
      // }
    }
    console.log(this.checkValue.toString());
    this.testID = this.checkValue.toString();
  }


  dataFasting(e: any, id) {
    console.log(e);
    console.log(e.checked);

    if (e.checked == true) {
      this.chkStatus = e.checked;
      console.log("true");
      this.checkFast.push(id);
      // alert("Please fill the Corresponding test also");
      console.log(this.checkFast);
      this.checkValue.toString();
      console.log("string")
      console.log(this.checkFast.toString());
      // for(let data of this.checkValue) {
      //   console.log("harman111")
      //   console.log(data)
      // }
    }
    console.log(this.checkFast.toString());
    this.fastid = this.checkFast.toString();
  }

  drawComplete() {
    this.isDrawing = false;
  }

  drawStart() {
    this.isDrawing = true;
  }

  savePad() {
    this.signature = '';
    this.signature = this.signaturePad.toDataURL();
    this.storage.set('savedSignature', this.signature);
    let imgurl = this.storage.get('savedSignature');

    //console.log(" LOOK HERE!!!! "+ JSON.stringify(imgurl) );

    imgurl.then((url) => {
      //console.log(url);
      if (url != null) {
        this.signature = this.signaturePad.toDataURL();
        // alert("1")
        console.log(this.signature);
        var test = url.split(',');
        // alert("2");
        console.log(test);
        var actualimg = test[1];
        // alert("3");
        console.log(actualimg);
        this.imageToSend = actualimg;
        // alert("4");
        console.log(this.imageToSend);
        this.signaturePad.clear();
        let toast = this.toastCtrl.create({
          message: 'New Signature saved.',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
        // this.storage.set('Doctor_Signature', this.imageToSend);
        // this.postSign(this.imageToSend);    //change this
      } else {
        console.log('err  ' + url);
        let toast = this.toastCtrl.create({
          message: 'Please confirm by pressing again.',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      }
    }, function (err) {

      console.log(err);
    })

  }

  clearPad() {
    this.signaturePad.clear();
  }






  sendrequest() {
    console.log(this.testID)
    let result = [];
    let ids = [];
    let z = [];
    let v= [];
    let requestt = [];
    let requesttym = [];
    console.log(this.req);
    console.log(this.reqtime);
    console.log(this.qty);

    for (var q in this.req) {
  
      z.push(q);
      console.log(z.toString());
      console.log("id", z);
      
    }
    for (var u in this.reqtime) {
  
      v.push(u);
      console.log(v.toString());
      console.log("id", v);
      
    }


    this.requesttimeId = v;
    console.log(this.requesttimeId);

    this.reqdateID = z;
    console.log(this.reqdateID);

    this.reqtime.forEach(function (key, value) {

      console.log("key");
      console.log(key);
      requesttym.push(key);
      console.log("value_date", requesttym);
      console.log(requesttym.toString());

    });
    this.request_timetest = requesttym.toString();
    console.log(this.request_timetest);


    this.req.forEach(function (key, value) {

      console.log("key");
      console.log(key);
      requestt.push(key);
      console.log("value_date", requestt);
      console.log(requestt.toString());

    });
    this.requesteddate = requestt.toString();
    console.log(this.requesteddate);

    var resultall = this.requesteddate + " " + this.request_timetest;
    console.log(resultall);

    // this.qty.forEach(function(key,value) {

    //   console.log("key");
    //   console.log(key);
    //   console.log(value);
    //   ids.push(value) //[key] = value;
    //   console.log("id",ids);
    // });

    //  for(var test of  this.qty) {
    //       console.log("harman111")
    //       console.log(test);
    //       ids.push(test) //[key] = value;
    //       console.log("id",ids);
    //     }

    for (var test in this.qty) {
      // if (this.qty.hasOwnProperty(this.qty)) {
      ids.push(test);
      console.log("id", ids);
      console.log(ids.toString());
      // }
    }
    this.diagonisID = ids.toString();
    console.log(this.diagonisID);
    let ids_value = [];

    console.log("id", ids);
    console.log(ids.join('@ddddddddxsf@123'));
    this.corresID = ids.join('@ddddddddxsf@123');
    console.log("ID", this.corresID);
    console.log("this.qty");
    console.log(this.qty);
    this.qty.forEach(function (key, value) {

      console.log("key");
      console.log(key);
      // console.log(value);
      ids_value.push(key) //[key] = value;
      //  console.log(this.qty);
      console.log("value", ids_value);
    });
    console.log(ids_value.join('@ddddddddxsf@123'));
    this.raku = ids_value.join('@ddddddddxsf@123');
    if (this.testID == '' || this.testID == null) {
      // alert("please select at least one test");
      let toast = this.toastCtrl.create({
        message: 'please select at least one test.',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    } else if (this.imageToSend == '') {
      // alert("please give your signature");
      let toast = this.toastCtrl.create({
        message: 'please give your signature.',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    }
    else if (this.testID != this.diagonisID) {
      // alert("please enter diagnosis for corresponding tests");
      let toast = this.toastCtrl.create({
        message: 'please enter diagnosis for corresponding tests.',
        duration: 3000
      });
      toast.present();

    } else if (this.testID != this.reqdateID) {
      // alert("please enter diagnosis for corresponding tests");
      let toast = this.toastCtrl.create({
        message: 'please enter request date for corresponding tests.',
        duration: 3000
      });
      toast.present();

    }else if (this.testID  != this.requesttimeId) {
     
      let toast = this.toastCtrl.create({
        message: 'please enter Request Time for corresponding tests.',
        duration: 3000
      });
      toast.present();

    }


    else {

      // return;
      // this.qty.forEach(function(key,value) {

      //   console.log("key");
      //   console.log(key);
      //   console.log(value);
      //   result.push({key:value}) //[key] = value;
      //   console.log(result)
      // });
      //  for(let datay of  this.qty) {
      //       console.log("harman111")
      //       console.log(datay);
      //     }

      //  let result = [];
      //     for (var value in this.qty) {
      //       // if (this.qty.hasOwnProperty(this.qty)) {
      //         result.push(value);
      //       // }
      //     }
      // console.log(result);


      console.log(this.imageToSend);

      //  var sign = this.storage.get('Doctor_Signature');

      // alert('patients');
      //  alert(this.fastid);
      // alert(this.testID);

      //alert(this.check_box);
      this.UID = localStorage.getItem("USERID");
      console.log(this.UID);

      this.store_id = this.navParams.get('test_id');
      console.log(this.store_id);
      let Loading = this.loadingctrl.create({
        content: 'Please wait...'
      });
      Loading.present();
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

      let options = new RequestOptions({ headers: headers });
      var url: string = this.appsetting.myGlobalVar + 'users/sendrequesttest';

      var data1 = {
        testid: this.testID,
        patientid: this.store_id,
        fasting: this.fastid,
        doctorid: this.UID,
        clientsignature: this.imageToSend,
        testdiagnosis: this.raku,
        testdiagnosisid: this.corresID,
        request_date: resultall
      }
      console.log(data1);
      var serialized = this.serializeObj(data1);
      this.http.post(url, serialized, options).map(res => res.json()).subscribe(data => {
        Loading.dismiss();
        this.data = data;
        console.log(this.data);
        //  alert("Submitted Successfully")
        let toast = this.toastCtrl.create({
          message: 'Test Submitted Successfully.',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
        this.navCtrl.push(PendingrequestPage);

        /////////////////////////////////
        // this.value=data.msg;
        // console.log(this.value);
      });
    }
  }

  skippage() {
    this.navCtrl.push(HomePage);
  }








}












