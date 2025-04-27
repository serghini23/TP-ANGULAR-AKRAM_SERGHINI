export enum UserType {
    Admin = "Admin",    
    Membre = "membre",
    Guest = "Guest"
}



export class User{
    private _userId : number;
    private _firstName : string;
    private _lastName : string;
    private _age : number;
    private _userType : UserType ; // Default value
constructor(userId : number, firstName : string, lastName : string, age : number , userType : UserType ){
        this._userId = userId;
        this._firstName = firstName;
        this._lastName = lastName;
        this._age = age;
        this._userType = userType;
    }




    public get userId() : number {
        return this._userId;
    }   
    public set userId(value : number) {
        this._userId = value;
    }
    public get firstName() : string {
        return this._firstName;
    }
    public set firstName(value : string) {
        this._firstName = value;
    }   
    public get lastName() : string {
        return this._lastName;
    }
    public set lastName(value : string) {
        this._lastName = value;
    }
    public get age() : number {
        return this._age;
    }
    public set age(value : number) {
        this._age = value;
    }
    public get userType() : UserType {
        return this._userType;
    }
    public set userType(value : UserType) {
        this._userType = value;
    }

    public fullname() : string{
         return `ID: ${this._userId}, First Name: ${this._firstName}, Last Name: ${this._lastName}`;
    }
    public greetuser() : string{
        return `Hello ${this._firstName} ${this._lastName}, you are a ${this._userType}`;
    }







}