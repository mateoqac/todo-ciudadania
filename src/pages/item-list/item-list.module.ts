import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemListPage } from './item-list';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ItemListPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemListPage),
    TranslateModule.forChild()

  ],
})
export class ItemListPageModule {}
