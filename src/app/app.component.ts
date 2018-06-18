import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";

import { Authentication } from './auth';

import { Geolocation } from '@ionic-native/geolocation';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;

}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  appMenuItems: Array<MenuItem>;
  usuario : string;
  usuarioJson :any;  
  localizacion : any;
  constructor(
    public platform: Platform,
    public geolocation:Geolocation,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: Authentication
  ) {
    this.initializeApp();
     
      geolocation.getCurrentPosition().then(pos => {
        this.localizacion = 'lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude;
      });

    this.auth.activeUser.subscribe((_user)=>{
    this.usuarioJson = _user;
     
    }) 

    this.appMenuItems = [
      {title: 'Tareas Diarias', component: HomePage, icon: 'calendar'}
    ];
  }

  initializeApp() {
      this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logoutAction() {
    this.auth.doLogout();
    this.nav.setRoot(LoginPage);
  }

}
