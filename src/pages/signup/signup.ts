import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Toast, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { UserService , AuthService} from '../../providers';
import { TreePage } from '../';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor( ){
    
  }
}
