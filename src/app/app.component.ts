import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { IndexPage } from '../pages';
import { MainPage } from '../pages';
import { TreePage } from '../pages';
import { UserService } from '../providers';
import { AuthService } from '../providers';

import { Person } from '../models/person'

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage:any;

  @ViewChild(Nav) nav: Nav;

  constructor(  private translate: TranslateService,
                platform: Platform,
                userSrv: UserService,
                private config: Config,
                private auth: AuthService,
                private statusBar: StatusBar,
                private splashScreen: SplashScreen) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
    this.initFamilyTree();
    if(!localStorage.getItem('todo-italia')){
      this.initItalyTodo();
    }
    
    if(userSrv.currentUser() && userSrv.currentUser().family_tree != undefined ){
      this.rootPage = MainPage;
    }
    else if(userSrv.currentUser() && userSrv.currentUser().family_tree === undefined ){
      this.rootPage = TreePage;
    } else{
      this.rootPage = IndexPage;
    }

  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  initFamilyTree(){
    let familyTree:any;

    this.translate.get(['GREAT_GREAT_GREAT_GRANDPARENT',
    'GREAT_GREAT_GRANDPARENT',
    'GREAT_GRANDPARENT',
    'GRANDPARENT',
    'PARENT',
    'MYSELF']).subscribe(value =>{
        let _GGGG = new Person(value['GREAT_GREAT_GREAT_GRANDPARENT']);
        let _GGG = new Person(value['GREAT_GREAT_GRANDPARENT']);
        let _GG = new Person(value['GREAT_GRANDPARENT']);
        let _G = new Person(value['GRANDPARENT']);
        let _P = new Person(value['PARENT']);
        let _M = new Person(value['MYSELF']);

        _GGGG.descendant = _GGG
        _GGG.descendant = _GG
        _GG.descendant = _G
        _G.descendant = _P
        _P.descendant = _M

        familyTree = [_GGGG,_GGG,_GG,_G,_P,_M]
        localStorage.setItem('family_tree', JSON.stringify(familyTree))
    })
  }

  initItalyTodo(){
    let _list = [
      {'title':'Codice Fiscale', 'checked':false},
      {'title':'Declaración de presencia', 'checked':false},
      {'title':'Presentación de carpeta', 'checked':false},
      {'title':'Registrar residencia', 'checked':false},
      {'title':'Paso del vigile', 'checked':false},
      {'title':'Respuesta PECs', 'checked':false},
      {'title':"Carta d'Identita", 'checked':false},
      {'title':'Pasaporte', 'checked':false},
      {'title':'Tessera sanitaria', 'checked':false},
      {'title':'Inscripción AIRE', 'checked':false},
      {'title':'Conversion Lic. Conducir', 'checked':false}
    ]

    localStorage.setItem('todo-italia',JSON.stringify(_list))
  } 

}
