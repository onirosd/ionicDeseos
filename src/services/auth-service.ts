import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*let apiUrl = 'http://181.224.225.51:8089/index.php/';*/
let apiUrl = 'http://localhost:82/layherprob/index.php/';

@Injectable()
export class AuthService {

  constructor(public http: Http) {
  }

  postData(credentials, type){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');    
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }



}