import { ShoppingCart } from "./ShoppingCart";

export class ShoppingCartItem {
private _itemProduct : string;
private _quantity : number;

constructor(itemProduct : string, quantity : number){
    this._itemProduct = itemProduct;
    this._quantity = quantity;
}
public get itemProduct() : string {
    return this._itemProduct;   
}
 public set itemProduct(value : string) {
    this._itemProduct = value;}
public get quantity() : number {
    return this._quantity;   }
public addProduct(ShoppingCart : ShoppingCart) {
    this._quantity ++;}
public subtractProduct(ShoppingCart : ShoppingCart ) {
    this._quantity --;}
public displayProductItem() : string {
    return `Product: ${this._itemProduct}, Quantity: ${this._quantity}`;}

}