import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { OnInit } from '@angular/core' 

import { UserService } from '../../providers/'
import { Certificate } from '../../models/certificate';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{

  page: string = 'main';
  pageTitleKey: string = 'HOME_TITLE';
  pageTitle: string;

  _current_user_tree = undefined;
  _toDoItaly:any;
  _toDoArgentina:Certificate[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public translate: TranslateService,
     public userSrv: UserService,
     public events:Events) 
     { }

  ionViewWillLoad() {
    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })

  }

  ionViewWillEnter() {
  }

  ngOnInit(){
    this._current_user_tree = this.userSrv.currentUserTree();
    this._toDoArgentina = this.parseToType(this._current_user_tree);
    this._toDoItaly = JSON.parse(localStorage.getItem('todo-italia'));
  }

  parseToType(json):Certificate[]{
    let _ret = new Array<Certificate>();
    for (let index = 0; index < json.length; index++) {
      let element = json[index];
      let _a = Object.assign(new Certificate(),element)
      _ret.push(_a)
    }
    return _ret
  }


}
