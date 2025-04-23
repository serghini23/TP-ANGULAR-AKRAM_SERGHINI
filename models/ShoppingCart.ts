import { ShoppingCartItem } from "./ShoppingCartItem";

export class ShoppingCart {
private _itemsProduct :string;
private _total: number;
constructor(itemsProduct : string, total : number){
    this._itemsProduct = itemsProduct;
    this._total = total;}
public get itemsProduct() : string {
    return this._itemsProduct;   }
    public set itemsProduct(value : string) {
    this._itemsProduct = value;}
public get total() : number {
    return this._total;   }
public set total(value : number) {
    this._total = value;}
public additem( ShoppingCartItem :  ShoppingCartItem)
{
    this._itemsProduct = ShoppingCartItem.itemProduct;
    this._total += ShoppingCartItem.quantity;}
public removeitem( ShoppingCartItem :  ShoppingCartItem)
{
    this._itemsProduct = ShoppingCartItem.itemProduct;
    this._total -= ShoppingCartItem.quantity;}


public getItems() : string {
    return '${this._itemsProduct;}' }


}