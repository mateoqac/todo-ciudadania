import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { HomePage } from './home';
import { TodoListPage } from '../todo-list/todo-list'

@NgModule({
  declarations: [
    HomePage,
    TodoListPage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild()
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
