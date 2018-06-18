import {Injectable} from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class Authentication {
  
  activeUser = new BehaviorSubject(null)
  datausuario :any;
  usuario : string;
  constructor() {
    
  }
  
  doLogin() {
  	
    this.datausuario = localStorage.getItem('userData');
    if((this.datausuario)){
       let infouser =   JSON.parse(this.datausuario);
       this.usuario = infouser.first_name+" "+infouser.last_name; 
     
    }else{
    	this.usuario = "no tenemos usuario";
    }

    this.activeUser.next(this.usuario)
  }
  
  doLogout() {
    this.datausuario = localStorage.getItem('userData');
    if((this.datausuario)){

			localStorage.removeItem('userData');
			localStorage.removeItem('dateNow');
			localStorage.clear();
    }
  	   
     this.activeUser.next(null)   
  }
}