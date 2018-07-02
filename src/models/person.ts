export class Person {

  name:string
  descendant:any;

  constructor(name:string) {
    this.name = name
    this.descendant = undefined
  }
}

export interface Person {
  [prop: string]: any;
}
