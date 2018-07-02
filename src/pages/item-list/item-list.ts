import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Navbar, Events } from 'ionic-angular';
import { Certificate } from '../../models/certificate';

@IonicPage()
@Component({
  selector: 'item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage implements OnInit {
  
  @ViewChild(Navbar) navBar: Navbar;
  item:Certificate
  callback:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public events: Events) { }

  ngOnInit(){
    this.item = this.navParams.get('item')   
    this.callback = this.navParams.get('callback')
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e:UIEvent)=>{ 
      this.callback(this.item).then(()=>{this.navCtrl.pop()});
    }
  }

  delete(index:number){
    this.item.items.splice(index,1);
    this.events.publish('save_todos')
  }
}
