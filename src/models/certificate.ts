export class Certificate {

  title:string
  items:any[];
  checked:boolean

  constructor() {
    this.title = undefined
    this.items = undefined
    this.checked = false
  }

  singleValue(total, item){
    return total && item.checked
  }

  itemsChecked(){
    this.items.reduce(this.singleValue)
  }
}

export interface Certificate {
  [prop: string]: any;
}
