export type User = {
    id?:number,
    email : string,
    username : string,
    firstname : string;
    lastname : string;
    password :string;
    confirm_password : string;
    isadmin? : boolean,
    image? : string,
}
