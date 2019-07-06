import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  page: string = 'about';
  pageTitleKey: string = 'INFO_TITLE';
  pageTitle: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public inAppBrowser: InAppBrowser) {
  }

  ionViewWillEnter() {
    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })
  }

  ionViewDidEnter() {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };
    const url = 'http://1000cosasinteresantes.com/'
    this.inAppBrowser.create(url, '_self', options)
  }

}
