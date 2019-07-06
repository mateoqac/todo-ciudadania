import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  esKey: string = "LANGUAGE_SPANISH"
  esLabel: string; 
  enKey: string = "LANGUAGE_ENGLISH";
  enLabel: string;
  ptKey: string = "LANGUAGE_PORTUGUESE";
  ptLabel: string;

  languages:any[]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService) {
    this.translate.get([this.esKey, this.enKey, this.ptKey]).subscribe((res) => {
      this.esLabel = res[this.esKey]
      this.enLabel = res[this.enKey]
      this.ptLabel = res[this.ptKey]
    })
    this.languages = [
      {
        value: 'es',
        label: this.esLabel
      },
      {
        value: 'en',
        label: this.enLabel
      },
      {
        value: 'pt-br',
        label: this.ptLabel
      }
    ];
  }

  ionViewWillEnter() {
    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })
  }

  choose(lang) {
    this.translate.use(lang);
    console.log(lang)
  }

}
