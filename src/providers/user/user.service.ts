import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  

  constructor() { }

  currentUserTree(){
    if (localStorage.getItem('current_user_tree')){
      return JSON.parse(localStorage.getItem('current_user_tree'))
    }
    else{
      return undefined
    }
  }

  setTreeToUser(tree){
    localStorage.setItem('current_user_tree',JSON.stringify(tree))
  }
}
