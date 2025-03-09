import {IUser} from "./userInterfaces";

export interface IComment{
    id:number,
    autor:IUser,
    text:string,
}