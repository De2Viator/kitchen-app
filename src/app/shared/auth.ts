export interface IAuthRequest {
    email:string,
    password:string,
    returnSecureToken:boolean,
}

export interface IAuthResponse {
    idToken:string,
    email:string,
    localId:string,
    refreshToken:string,
    kind:string
    registered?:string,
    expiresIn:string
}