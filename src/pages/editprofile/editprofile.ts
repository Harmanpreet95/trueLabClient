import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ViewPage } from '../view/view';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import {Camera,CameraOptions} from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { HomePage } from '../home/home';
// import {Camera} from 'ionic-native';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html'
})
export class EditprofilePage {
  agency_id: any;
  agname: any;
  data_Profile :  any;
  public base64Image: string;
  srcImage : string;
  
  
  // srcImage : any;
  public CameraPopoverOptions ;
  public profile_image = '';
  // public getPicture : any;
  
  //   cameraData: string;
  // photoTaken: boolean;
  // cameraUrl: string;
  // photoSelected: boolean;
  submitted = false;
  
  onSubmit() { this.submitted = true; }
public data='';
public UID;
public agencyName;
// public actionSheet : any;
public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
  });
 constructor( public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,public toastCtrl: ToastController, private camera: Camera ,private modalCtrl: ModalController ,public http:Http, public loadingCtrl:LoadingController , public appsetting: Appsetting) {
    this.UID = localStorage.getItem("USERID");
    console.log(this.UID);
    this.showprofile();
    
   // this.userRolelocal = localStorage.getItem('userRolelocal');
    // alert(this.agencyName)
    console.log('Agency' +this.agencyName);
    // this.photoTaken = false;
 }

serializeObj(obj){
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    return result.join("&");
}
openActionSheet(){
 console.log('opening');
 let actionsheet = this.actionSheetCtrl.create({
 title:"Choose Album",
 buttons:[{
 text: 'Camera',
 handler: () => {
 console.log("Camera Clicked");
  // alert("harman take Picture")
  const options: CameraOptions = {
  quality: 8,
  sourceType : 1,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}
this.camera.getPicture(options).then((imageData) => {
  // alert("Image");
  // alert(imageData);
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
  // this.srcImage = 'data:image/jpeg;base64,' + imageData;
  
  
  this.srcImage = 'data:image/jpeg;base64,' + imageData;
  localStorage.setItem("IMG", this.srcImage);
  this.profile_image =  imageData; 
}, (err) => {
 // Handle error
});
 }
 },{
 text: 'Gallery',
 handler: () => {
 console.log("Gallery Clicked");
//  alert("harman get Picture")
                const options: CameraOptions = {
                quality: 20,
                sourceType : 0,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
              }
              this.camera.getPicture(options).then((imageUri) => {
                // alert("Image");
                // alert(imageUri);
              // imageData is either a base64 encoded string or a file URI
              // If it's base64:
               this.srcImage = 'data:image/jpeg;base64,' + imageUri;
              localStorage.setItem("IMG", this.srcImage);
               this.profile_image =  imageUri;
              }, (err) => {
              // Handle error
              });
 }
},
{
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
          //  actionsheet.dismiss()         
         }
       }
     ]
   });

   actionsheet.present();
 }




 showprofile(){
   this.agencyName =localStorage.getItem("agencyName");
   console.log("showprofile", this.agencyName);
  // this.Loading.present();
   var data_all = {
            id : this.UID
           }
   
    var serialized_all = this.serializeObj(data_all); 
    console.log(serialized_all);
    let headers = new Headers();
    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
   // var url:string = 'http://rakesh.crystalbiltech.com/truelab/api/users/registration';
 var url:string = this.appsetting.myGlobalVar+'users/userinfo';
 this.http.post(url, serialized_all, options).map(res=>res.json()).subscribe(data=>{
  //alert("profile")
  console.log(data);
       console.log("Agencyname",data.msg.User.agencyname);
     this.agname = data.msg.User.agencyname;
     this.agency_id = data.msg.User.agencyid;
     console.log()
     console.log("agname",this.agname);
  // this.Loading.dismiss();
  if(data.error == 0){
     console.log(data);
     console.log(data.msg.User);

    //  console.log("" ,data.msg.User.agencyname);
    //  var USER = data.msg.User;
     this.data = data.msg.User;
     this.srcImage = data.msg.User.image;
     console.log(this.profile_image);
     console.log("check hereeeeee")
     console.log(this.data);
     console.log("also here!!!")
   
  }else{
    // alert("TRY AGAIN!");
    let toast = this.toastCtrl.create({
      message: 'TRY AGAIN!',
      duration: 3000
    });
    toast.present();
  }
this.Loading.dismiss();
// this.data=data;
//       console.log(this.data);
//       if(data.error == 0){
//             this.navCtrl.push(ViewPage); 
//        }
    }
    );
 }


viewPage(){
  this.navCtrl.push(ViewPage);
    }



  editprofile(editForm) {
    if(this.agname == null){
// alert("null")
      // alert("agency null")
    // alert("editprofile")
    if (this.profile_image == undefined) {
      this.profile_image = '';
      //  alert('Image not changed')
    } else {
      //  alert(this.profile_image);
      // alert('changed')
    }

    this.UID = localStorage.getItem("USERID");

    var data_Profile = {
      id: this.UID,
      firstname: editForm.value.firstname,
      email: editForm.value.email,
      phonenumber: editForm.value.phonenumber,
      fax: editForm.value.fax,
      npi: editForm.value.npi,
      city: editForm.value.city,
      zipcode: editForm.value.zipcode,
      state: editForm.value.state,
      address: editForm.value.address,
      address2: editForm.value.address2,
      image: this.profile_image,
      // agencyname : null,
      // agencyphonenumber : null,
      // agencyfax : null

    }

    // alert(JSON.stringify(data_Profile));
    var serialized = this.serializeObj(data_Profile);
    console.log(serialized);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    var url: string = this.appsetting.myGlobalVar + 'users/editprofile';

    //return false;
    this.http.post(url, serialized, options).map(res => res.json()).subscribe(data => {

      if (data.error == 0) {  
        console.log(data);
        // this.showprofile();
        // alert("Profile details Changed");
let toast = this.toastCtrl.create({
      message: 'Profile details Changed',
      duration: 3000
    });
    toast.present();
        this.navCtrl.push(HomePage);
      } else {
        // alert("TRY AGAIN!");
        let toast = this.toastCtrl.create({
      message: 'TRY AGAIN!',
      duration: 3000
    });
    toast.present();
      }
      this.Loading.dismiss();

    }, err => {
      // alert("Invalid data");
       let toast = this.toastCtrl.create({
      message: "Invalid data",
      duration: 3000
    });
    toast.present();
      console.log("Error");
      this.Loading.dismiss();
      console.log("Error!:", err);
    });

  }else{
        if (this.profile_image == undefined) {
      this.profile_image = '';
      //  alert('Image not changed')
    } else {
      // alert("user null")
      //  alert(this.profile_image);
      // alert('changed')
    }

    this.UID = localStorage.getItem("USERID");

  this.data_Profile= {
      agencyid : this.agency_id,
      // id: this.UID,
      // firstname: null,
      // lastname : null,
      username : editForm.value.email,
      email: editForm.value.email,
      // phonenumber: null,
      // fax: null,
      // npi: null,
      city: editForm.value.city,
      zipcode: editForm.value.zipcode,
      state: editForm.value.state,
      address: editForm.value.address,
      address2: editForm.value.address2,
      image: this.profile_image,
      agencyphonenumber : editForm.value.agencyphonenumber,
      agencyfax : editForm.value.agencyfax,
      agencyname : editForm.value.agencyname,

    }
     console.log("agency data - >" + this.data_Profile);
    // alert(JSON.stringify(data_Profile));
    var serialized = this.serializeObj(this.data_Profile);
    console.log(serialized);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    var url: string = this.appsetting.myGlobalVar + 'users/agencyeditprofile';

    //return false;
    this.http.post(url, serialized, options).map(res => res.json()).subscribe(data => {

      if (data.error == 0) {  
        console.log(data);
        // this.showprofile();
        // alert("Profile details Changed");
let toast = this.toastCtrl.create({
      message: "Profile details Changed",
      duration: 3000
    });
    toast.present();
        this.navCtrl.push(HomePage);
      } else {
        // alert("TRY AGAIN!");
        let toast = this.toastCtrl.create({
      message: 'TRY AGAIN!',
      duration: 3000
    });
    toast.present();
      }
      this.Loading.dismiss();

    }, err => {
      // alert("Invalid data");
      let toast = this.toastCtrl.create({
      message: 'Invalid data',
      duration: 3000
    });
    toast.present();
      console.log("Error");
      this.Loading.dismiss();
      console.log("Error!:", err);
    });
  }
  }

}
 