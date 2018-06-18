import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController, Platform} from "ionic-angular";
import {HomePage} from "../home/home";
import { AuthService } from '../../services/auth-service';
import { Authentication } from '../../app/auth';

import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  resposeData : any;
  userData = {"identity":"", "password":""};
  localizacion2 : any;
  constructor( public platform: Platform,  public geolocation:Geolocation, public aut:Authentication, public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, public authService:AuthService) {
    this.menu.swipeEnable(false);
     geolocation.getCurrentPosition().then(pos => {
        this.localizacion2 = 'lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude;
     });
  }


  

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
