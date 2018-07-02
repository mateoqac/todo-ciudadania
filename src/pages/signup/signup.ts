import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Toast, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { UserService , AuthService} from '../../providers';
import { MainPage } from '../';
import { TreePage } from '../';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  account: { name: string, email: string, password: string, last_name:string } = {
    name: '',
    last_name: '',
    email: '',
    password: ''
  };

  @ViewChild(NgForm)
  form: NgForm;

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public userSrv: UserService,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private auth:AuthService,
    public loadingCtrl: LoadingController) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignUp() {
    let loading = this.loadingCtrl.create();
    loading.present()
    let data = this.form.value;
		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signUp(this.account).then(
      () => {
        this.showSucessSignUp(this.account)
        this.navCtrl.setRoot(TreePage)
        this.userSrv.signup(this.account)
        loading.dismiss()
      },
      
			error => {
        loading.dismiss()
        let toast = this.toastCtrl.create({
          message: error.message,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
		);

    // this.showSucessSignUp(this.account)
    // this.navCtrl.push(TreePage)
    // this.userSrv.signup(this.account)


    // Attempt to login in through our User service
    // this.userSrv.signup(this.account).subscribe((resp) => {
    //
    //   this.navCtrl.push(MainPage);
    // }, (err) => {
    //
    //   this.navCtrl.push(MainPage);
    //
    //   // Unable to sign up
    //   let toast = this.toastCtrl.create({
    //     message: this.signupErrorString,
    //     duration: 3000,
    //     position: 'bottom'
    //   });
    //   toast.present();
    // });
  }

  private showSucessSignUp(account){
    let toast:Toast;
    this.translateService.get('SIGNUP_SUCCESS',{value: account.name}).subscribe(
      (value) => {
        toast = this.toastCtrl.create({
        message: value,
        duration: 3000,
        position: 'bottom'
      });
      toast.present()
    })
  }

}
