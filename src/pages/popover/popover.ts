import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Certificate } from '../../models/certificate';
import { MainPage } from '../';

import { UserService } from '../../providers/'

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  tree:any;
  descendant:undefined;

  page: string = 'main';
  pageTitleKey: string = 'CHOOSE_THE_ITALIAN';
  pageTitle: string;
  buttonText:string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public translate: TranslateService,
              public loadingCtrl: LoadingController,
              public userSrv: UserService) {
    this.tree = JSON.parse(localStorage.getItem('family_tree'))
    this.tree.pop()
  }

  ionViewWillLoad() {
    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    });
    this.translate.get('GENERATE_BUTTON_TEXT').subscribe( (res) =>{
      this.buttonText = res;
    });
  }

  generateFamilyTree(){
    let _loading = this.loadingCtrl.create();
    let _value;
    _loading.present()
    for (let i = 0; i < this.tree.length; i++) {
        if(this.tree[i].name === this.descendant){
          _value = this.tree[i]
        };
    }
    this.createCertificates(_value)
    _loading.dismiss()
  }

  createCertificates(param){
    let _ret:Array<Certificate> = [];
    let copy = param
    this.create(copy,_ret,false,true)
    copy = copy.descendant
    while(copy.descendant != undefined){
      this.create(copy,_ret)
      copy = copy.descendant
    }
    this.create(copy,_ret,true,false)
    this.addCNR(_ret)
    this.navCtrl.setRoot(MainPage)
    this.userSrv.setTreeToUser(_ret)
  }

  create(param, _ret:Array<Certificate>, last?, italian?){
    let _partidas = ['Nacimiento ', 'Matrimonio ', 'Defunción ']
    let __= new Certificate();
    if(last){
      let _a = Object.assign(new Certificate(),__)
      _a.title = 'Nacimiento '+ param.name
      if(!italian){
        _a.items = [{'title':'Legalización','checked':false},{'title':'Apostilla','checked':false},{'title':'Traducción','checked':false},{'title':'Verificación consular de traducción','checked':false}]
      }
      _ret.push(_a)
    }else{
      for (let i = 0; i < _partidas.length; i++) {
          _partidas[i];
          let _a = Object.assign(new Certificate(),__)
          _a.title = _partidas[i]+param.name
          if(!italian){
            _a.items = [{'title':'Legalización','checked':false},{'title':'Apostilla','checked':false},{'title':'Traducción','checked':false},{'title':'Verificación consular de traducción','checked':false}]
          }
          _ret.push(_a)
      }
    }
  }


  addCNR(list){
    let __= new Certificate();
    __.title = 'Certificado No Renuncia'
    __.items = [{'title':'Apostilla','checked':false},{'title':'Traducción','checked':false},{'title':'Verificación consular de traducción','checked':false}]
    list.push(__)
  }
}
