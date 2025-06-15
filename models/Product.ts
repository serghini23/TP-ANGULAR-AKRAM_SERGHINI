export class  Product {
    private _productID : string;
    private _productTitle : string;
    private _productPrice : number;
    private _productImage : string;
    private _quantity: number;
    private _category : string; 
    private _hasOffer?: boolean;
    private _discountPercent?: number;
    private _originalPrice?: number;




    constructor(productID : string, productTitle : string, productPrice : number  , productImage : string , productQuantity : number , category : string = "General", hasOffer?: boolean, discountPercent?: number, originalPrice?: number) {
        this._productID = productID;
        this._productTitle = productTitle;
        this._productPrice = productPrice;
        this._productImage = productImage;  
        this._quantity = productQuantity;
        this._category = category;
        this._hasOffer = hasOffer;
        this._discountPercent = discountPercent;
        this._originalPrice = originalPrice;
    }

     public get productID() : string {
        return this._productID;
    }
     public set productID(value : string) {
        this._productID = value;
    }

    public get category() : string {
        return this._category;
    }
    public set category(value : string) {
        this._category = value;
    }

    public get productTitle() : string {
        return this._productTitle;
    }
    public set productTitle(value : string) {
        this._productTitle = value;
    }
    public get productPrice() : number {
        return this._productPrice;
    }
    public set productPrice(value : number) {
        this._productPrice = value;
    }
    public get productImage() : string {
        return this._productImage;
    }
    public set productImage(value : string) {   
        this._productImage = value;
    }
    public get productQuantity() : number {
        return this._quantity;
    }
    public set productQuantity(value : number) {
        this._quantity = value;
    }
    public get hasOffer() : boolean | undefined {
        return this._hasOffer;
    }
    public set hasOffer(value : boolean | undefined) {
        this._hasOffer = value;
    }
    public get discountPercent() : number | undefined {
        return this._discountPercent;
    }
    public set discountPercent(value : number | undefined) {
        this._discountPercent = value;
    }
    public get originalPrice() : number | undefined {
        return this._originalPrice;
    }
    public set originalPrice(value : number | undefined) {
        this._originalPrice = value;
    }


    public printProduct() : string {
        return `ID: ${this._productID}, Title: ${this._productTitle}, Price: ${this._productPrice}, Quantity: ${this._quantity}, Category: ${this._category}, Has Offer: ${this._hasOffer}, Discount Percent: ${this._discountPercent}, Original Price: ${this._originalPrice}`;
    }

    }
