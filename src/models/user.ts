import { Certificate } from "./certificate";

/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Item" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or a "Animal," or something like that.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
export class User {


  constructor(accountInfo) {
    this.email = accountInfo.email;
    this.name = accountInfo.name;
    this.last_name = accountInfo.lastName;
    this.password = accountInfo.password;
    this.family_tree = undefined;
  }

}

export interface User {
  [prop: string]: any;
}
