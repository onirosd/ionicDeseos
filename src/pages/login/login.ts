import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import { AuthService } from '../../services/auth-service';
import { Authentication } from '../../app/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  resposeData : any;
  userData = {"identity":"", "password":""};

  constructor(public aut:Authentication, public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, public authService:AuthService) {
    this.menu.swipeEnable(false);
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
