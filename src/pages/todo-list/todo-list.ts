import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Input } from '@angular/core' 
import { ItemList } from '../'
import { Certificate } from '../../models/certificate';
import { Checkbox} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'todo-list',
  templateUrl: 'todo-list.html',
})
export class TodoListPage {

  @Input('toDo')toDo:Array<Certificate>;
  _checkbox:Checkbox;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public events: Events) {
  }

  singleValue(total, item){
    return  item.checked && total
  }

  changing(cbox,item){
    this._checkbox = cbox
    cbox.checked = item.items.reduce(this.singleValue,true)
    item.checked = cbox.checked
  }

  myFunction(item,event){
    this.navCtrl.push(ItemList,{'item': item,'check': event.currentTarget,'callback':this.checkingList})
  }

  checkingList = (item) =>{
    return new Promise((resolve, reject) => {
      resolve();
      this.changing(this._checkbox,item)
      this._checkbox = undefined
    });
  };


  delete(index:number){
    this.toDo.splice(index,1);
    this.events.publish('save:todos')
  }
}
