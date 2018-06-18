import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, PopoverController, MenuController} from "ionic-angular";
import { AuthService } from '../../services/auth-service';
import { LoginPage } from '../login/login'; 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  resposeData : any;
  respInsAsistencias : any; /* Arreglo para que se inicie la sesion */
  globalArray : any;
  clases: any[];
  fechaactual :String;
  myarray = {};
  marcaData = {"id":"",};



  //globalArray : any;
 
  constructor(public popoverCtrl: PopoverController, public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, public authService:AuthService) {
 
   this.myarray = {

         pendiente : 'red-bg',
         EnCurso   : 'orange-bg',
         Cumplido  : 'green-bg',
         Cancelado : 'light-bg'
   };

    let infouser =   JSON.parse(localStorage.getItem('userData'));
    if(infouser !== null){
         
       this.listamoseventos({id:infouser.id});
       this.fechaactual = JSON.parse(localStorage.getItem('dateNow')); 

    }else{

      nav.push(LoginPage);
    }

  }


  listamoseventos(enviar){
   
    this.authService.postData(enviar, "evnservice").then((result) =>{
        this.resposeData = result;
        if(this.resposeData.llave){
           
             if(this.resposeData.valores !== undefined){
                 var stringifiedData = JSON.stringify(this.resposeData.valores);
                 var parsedData = JSON.parse(stringifiedData);
                 this.globalArray = parsedData;
             }
         
      }
      else{
        this.presentToast(this.resposeData.mensaje);
      }

    }, (err) => {
       /* Tenemos algun error al traer la data */
    });

  }


   eventMarcacion(id, tipo){
        let mensaje = {"llave":false, "mensaje":""};
        this.marcaData.id = id;
        this.authService.postData(this.marcaData, tipo).then((result) =>{
        this.respInsAsistencias = result;
        mensaje.llave           = this.respInsAsistencias.llave;
        mensaje.mensaje         = this.respInsAsistencias.mensaje;    
        
        this.presentToastTop(mensaje.mensaje);
        this.nav.setRoot(this.nav.getActive().component);

    }, (err) => {
        mensaje.mensaje = "Errores en el evento.";
        this.presentToastTop(mensaje.mensaje);
       
    });

   }

  
  marcacion(_event) {
      
        let target = _event.target || _event.srcElement || _event.currentTarget;
        let idEvento = target.id;
        let eventos :any;

        let forgot = this.forgotCtrl.create({
          title: 'Marcar Inicio de Evento',
          message: "¿ Esta seguro que desea generar la marcación ?",
          buttons: [
            {
              text: 'Cancelar',
              handler: data => {
                this.presentToastTop("Se cancelo la marcación! "); 
              }
            },
            {
              text: 'Marcar',
              handler: data => {
              
                this.eventMarcacion(idEvento, "mcservice"); 

              }
            }
          ]
        });

    forgot.present();
  }
 
 marcacionSalida(_event) {
      
        let target = _event.target || _event.srcElement || _event.currentTarget;
        let idEvento = target.id;
        let eventos :any;

        let forgot = this.forgotCtrl.create({
          title: 'Marcar Salida de Evento',
          message: "¿ Esta seguro que desea generar la marcación de salida ?",
          buttons: [
            {
              text: 'Cancelar',
              handler: data => {
                this.presentToastTop("Se cancelo la marcación! "); 
              }
            },
            {
              text: 'Marcar',
              handler: data => {
              
                this.eventMarcacion(idEvento, "mcservicesal"); 

              }
            }
          ]
        });

    forgot.present();
  }




 presentToastTop(msg) {
    let toast = this.toastCtrl.create({
                  message:  msg,
                  duration: 3000,
                  position: 'top',
                  cssClass: 'dark-trans',
                  closeButtonText: 'OK',
                  showCloseButton: true
                });

    toast.present();
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
