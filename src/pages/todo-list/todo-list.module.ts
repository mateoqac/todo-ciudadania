import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoListPage } from './todo-list';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    TodoListPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoListPage),
    TranslateModule.forChild()
  ],
})
export class TodoListPageModule {}
