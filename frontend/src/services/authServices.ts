import {IToken} from "../interfaces/tokenInterfaces";
import {apiServices} from "./apiServices";
import {urls} from "../constants/urls";

const _accessTokenKey = "access";
const _refreshTokenKey = "refresh";

const authServices = {
    async login (user:{email: string, password: string}){
        const {data:{access,refresh}}=await apiServices.post<IToken>(urls.auth.login, user);
         authServices.setToken({access,refresh,});
    },
    setToken({refresh,access}:IToken):void{
        localStorage.setItem(_accessTokenKey, (access));
        localStorage.setItem(_refreshTokenKey, (refresh));
    },
    getAccessToken():string|null{
        return localStorage.getItem(_accessTokenKey);
    },
    getRefreshToken():string| null{
        return localStorage.getItem(_refreshTokenKey);
    },
    deleteToken():void{
        localStorage.removeItem(_accessTokenKey);
        localStorage.removeItem(_refreshTokenKey);
    }
}
export {
    authServices
}