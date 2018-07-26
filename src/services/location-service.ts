import { Injectable} from "@angular/core";
import { Platform } from "ionic-angular";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Geolocation } from '@ionic-native/geolocation';
declare let AdvancedGeolocation:any;


@Injectable()
export class LocationService {
  mensaje_alt :any;
  currentLat :any;
  currentLng :any;
  localizacion = new BehaviorSubject(null);
  data:any;
  // private localizacion : any;

  constructor( public platform: Platform,  public geolocation:Geolocation ) {
  }

  
  getcoordenadas(){
   

      if (this.platform.is('android')) {
    
          this.platform.ready().then(() => {
            AdvancedGeolocation.start((success) => {
              //loading.dismiss();
              // this.refreshCurrentUserLocation();
              try {
                var jsonObject = JSON.parse(success);
                this.mensaje_alt = "Provider " + JSON.stringify(jsonObject);
                switch (jsonObject.provider) {
                  case "gps":
                    console.log("setting gps ====<<>>" + jsonObject.latitude);

         
                    this.data = jsonObject.latitude+'/'+jsonObject.longitude;
                    this.localizacion.next(this.data);
                    break;

                  case "network":
                    console.log("setting network ====<<>>" + jsonObject.latitude);

                    this.data = jsonObject.latitude+'/'+jsonObject.longitude;
                    this.localizacion.next(this.data);

                    break;

                  case "satellite":
                    
                     console.log("setting network ====<<>>" + jsonObject.latitude);

                    // this.currentLat = jsonObject.latitude;
                    // this.currentLng = jsonObject.longitude;
             
                     this.data = jsonObject.latitude+'/'+jsonObject.longitude;
                    this.localizacion.next(this.data);
                    break;

                  case "cell_info":
                    //TODO
                    break;

                  case "cell_location":
                    //TODO
                    break;

                  case "signal_strength":
                    //TODO
                    break;
                }
              }
              catch (exc) {
                console.log("Invalid JSON: " + exc);
              }
            },
              function (error) {
                console.log("ERROR! " + JSON.stringify(error));
              },
              {
                "minTime": 500,         // Min time interval between updates (ms)
                "minDistance": 1,       // Min distance between updates (meters)
                "noWarn": true,         // Native location provider warnings
                "providers": "all",     // Return GPS, NETWORK and CELL locations
                "useCache": true,       // Return GPS and NETWORK cached locations
                "satelliteData": false, // Return of GPS satellite info
                "buffer": false,        // Buffer location data
                "bufferSize": 0,         // Max elements in buffer
                "signalStrength": false // Return cell signal strength data
              });

          });
          
         } 

         else {

            this.geolocation.getCurrentPosition().then(pos => {
          // this.localizacion = 'lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude;
            // this.currentLat = pos.coords.latitude;
            // this.currentLng = pos.coords.longitude;
           
            this.data = pos.coords.latitude+'/'+pos.coords.longitude;
            this.localizacion.next(this.data) ;

             // console.log(this.localizacion.getValue());
          });

        }

  }


   getValue() {
       
        return this.localizacion.getValue();
    }


}