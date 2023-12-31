import ProductValidatorFactory from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";
import NotificationError from "../../@shared/notification/notification.error";

export default class ProductB implements ProductInterface{
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id:string, name:string, price:number){
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate():boolean{
    
    if(this._id.length === 0) throw new Error("Id product is required");
    if(this._name.length === 0) throw new Error("Name product is required");
    if(this._price < 0) throw new Error("price must be greater than zero");
    
    return true
  }

  changeName(name:string):void{
    this._name = name;
    this.validate();  
  }

  changePrice(price:number):void{
    this._price = price;
    this.validate();
  }

  get id():string{
    return this._id;
  }

  get name():string{
    return this._name;
  }
  
  get price():number {
    return this._price * 2;
  }
}