export interface User {
    name:string,
    id:string,
    blogs:string[],
    images:string[],
    email:string,
    microsoftID:string
}

export interface TokenUser {
    /*id:string,*/
    microsoftID:string
}