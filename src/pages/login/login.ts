import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController, Platform} from "ionic-angular";
import {HomePage} from "../home/home";
import { AuthService } from '../../services/auth-service';

// import 'rxjs';
// import { Observable } from 'rxjs/Observable';
 import { Authentication } from '../../app/auth';
import { LocationService } from '../../services/location-service';
//import { Geolocation, Geoposition, PositionError } from '@ionic-native/geolocation';
//declare let AdvancedGeolocation:any;


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  resposeData : any;
  userData    = {"identity":"", "password":""};
  coordenadas = {"latitude":"", "longitude":""};
  mensaje_alt :any;
  
  currentLat :any;
  currentLng :any;
  localizacion : any;
  topRecordLabels = [];

  constructor( public platform: Platform, private loc:LocationService,  public aut:Authentication, public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, public authService:AuthService) {
    this.menu.swipeEnable(false);

    this.loc.getcoordenadas();
    this.loc.localizacion.subscribe((_coordenadas)=>{ 
      
    this.localizacion = _coordenadas;
     
    }); 

        // loc.getcoordenadas();
        // loc.getcoordenadas();

     // this.localizacion = loc.localizacion;
   
  }




  // getPosition(){

  //     if (this.platform.is('android')) {
    
  //         this.platform.ready().then(() => {
  //           AdvancedGeolocation.start((success) => {
  //             //loading.dismiss();
  //             // this.refreshCurrentUserLocation();
  //             try {
  //               var jsonObject = JSON.parse(success);
  //               this.mensaje_alt = "Provider " + JSON.stringify(jsonObject);
  //               switch (jsonObject.provider) {
  //                 case "gps":
  //                   console.log("setting gps ====<<>>" + jsonObject.latitude);

  //                   this.currentLat = jsonObject.latitude;
  //                   this.currentLng = jsonObject.longitude;
  //                   this.localizacion =  'lat: ' + this.currentLat + ', lon: ' + this.currentLng;
  //                   break;

  //                 case "network":
  //                   console.log("setting network ====<<>>" + jsonObject.latitude);

  //                   this.currentLat = jsonObject.latitude;
  //                   this.currentLng = jsonObject.longitude;
  //                   this.localizacion =  'lat: ' + this.currentLat + ', lon: ' + this.currentLng;

  //                   break;

  //                 case "satellite":
                    
  //                    console.log("setting network ====<<>>" + jsonObject.latitude);

  //                   this.currentLat = jsonObject.latitude;
  //                   this.currentLng = jsonObject.longitude;
  //                   this.localizacion =  'lat: ' + this.currentLat + ', lon: ' + this.currentLng;
  //                   break;

  //                 case "cell_info":
  //                   //TODO
  //                   break;

  //                 case "cell_location":
  //                   //TODO
  //                   break;

  //                 case "signal_strength":
  //                   //TODO
  //                   break;
  //               }
  //             }
  //             catch (exc) {
  //               console.log("Invalid JSON: " + exc);
  //             }
  //           },
  //             function (error) {
  //               console.log("ERROR! " + JSON.stringify(error));
  //             },
  //             {
  //               "minTime": 500,         // Min time interval between updates (ms)
  //               "minDistance": 1,       // Min distance between updates (meters)
  //               "noWarn": true,         // Native location provider warnings
  //               "providers": "all",     // Return GPS, NETWORK and CELL locations
  //               "useCache": true,       // Return GPS and NETWORK cached locations
  //               "satelliteData": false, // Return of GPS satellite info
  //               "buffer": false,        // Buffer location data
  //               "bufferSize": 0,         // Max elements in buffer
  //               "signalStrength": false // Return cell signal strength data
  //             });

  //         });
          
  //        } 

  //        else {

  //         //  this.geolocation.watchPosition().subscribe(position => {
           
  //         //  if ((position as Geoposition).coords != undefined) {
  //         //  var geoposition = (position as Geoposition);
  //         // // console.log('Latitude: ' + geoposition.coords.latitude + ' - Longitude: ' + geoposition.coords.longitude);
           
  //         //  this.currentLat = position.coords.latitude;
  //         //  this.currentLng = position.coords.longitude;

  //         //  } 
           
  //         //  });
  //         //  
  //           this.geolocation.getCurrentPosition().then(pos => {
  //         // this.localizacion = 'lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude;
  //           this.currentLat = pos.coords.latitude;
  //           this.currentLng = pos.coords.longitude;
        
  //           this.localizacion =  'lat: ' + this.currentLat + ', lon: ' + this.currentLng;
  //           console.log(this.localizacion);
  //         });

  //       }
     

  //   this.coordenadas.latitude  = this.currentLat;
  //   this.coordenadas.longitude = this.currentLng;


  // }
  

  login(){

   if(this.userData.identity && this.userData.password){
    this.authService.postData(this.userData, "logservice").then((result) =>{
        this.resposeData = result;
    
        if(this.resposeData.llave){
        
          localStorage.setItem('userData', JSON.stringify(this.resposeData.valores))
          localStorage.setItem('dateNow',  JSON.stringify(this.resposeData.fecha))
          this.loginAction();
          this.nav.setRoot(HomePage);
      }
      else{
        this.presentToast(this.resposeData.mensaje);
      }

    }, (err) => {
      
    });
   }
   else{
    this.presentToast("Ingresar Usuario y contraseña");
   }
  
  }

  loginAction(){
    this.aut.doLogin();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: this.removeHTMLInfo(msg),
      duration: 2000
    });
    toast.present();
  }

  removeHTMLInfo(value: string)
  {  
     if (value)
     return value.replace(/<\/?[^>]+>/gi, "");
  }


}
