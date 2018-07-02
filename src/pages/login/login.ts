import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { UserService, AuthService } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: UserService,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private auth: AuthService,) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }


  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
        () => this.navCtrl.setRoot(MainPage),
        error => {
          let toast = this.toastCtrl.create({
            message: error.message,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      );
  }
  // Attempt to login in through our User service
  doLogin() {
    this.auth.signInWithEmail(this.account)
			.then(
				() => this.navCtrl.setRoot(MainPage),
        error => {
          let toast = this.toastCtrl.create({
            message: error.message,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
        
        // this.loginError = error.message
			);
    // this.user.login(this.account).subscribe((resp) => {
    //   this.navCtrl.push(MainPage);
    // }, (err) => {
    //   this.navCtrl.push(MainPage);
    //   // Unable to log in
    //   let toast = this.toastCtrl.create({
    //     message: this.loginErrorString,
    //     duration: 3000,
    //     position: 'bottom'
    //   });
    //   toast.present();
    // });
  }
}
