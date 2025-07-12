
import {IUser} from "./userInterfaces";

export interface IComments{
    id:number,
    manager:IUser | number |null,
    comment:string,
    created_at:number,
}
