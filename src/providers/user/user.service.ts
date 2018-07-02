import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { User } from '../../models/user'

import { Api } from '../api/api';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class UserService {
  _user: any;

  constructor(public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('login', accountInfo).share();

    seq.subscribe((res: any) => {
      this._loggedIn(res);
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {

    let _current_user = new User(accountInfo);
    localStorage.setItem('current_user', JSON.stringify(_current_user));
    // let seq = this.api.post('signup', accountInfo).share();
    //
    // seq.subscribe((res: any) => {
    //   // If the API returned a successful response, mark the user as logged in
    //   if (res.status == 'success') {
    //     this._loggedIn(res);
    //   }
    // }, err => {
    //   console.error('ERROR', err);
    // });
    //
    // return seq;
  }

  currentUser(){
    if(localStorage.getItem('current_user')){
        return JSON.parse(localStorage.getItem('current_user'))
    }
    else{
      return undefined
    }
  }

  setCurrentUser(user){
    localStorage.setItem('current_user',JSON.stringify(user))
  }

  setTreeToUser(tree){
    if(localStorage.getItem('current_user')){
        let _user = JSON.parse(localStorage.getItem('current_user'))
        _user.family_tree = tree
        localStorage.setItem('current_user',JSON.stringify(_user))
    }
  }

  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
