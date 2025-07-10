import {IComments} from "./commentInterface";
import {IUser} from "./userInterfaces";

export interface IOrder {
    id: number,
    name: string,
    surname: string,
    email: string,
    phone: string,
    age: number,
    course:string,
    course_type:string,
    course_format: string,
    status: string,
    sum: string,
    alreadyPaid: string,
    created_at:string,
    manager: IUser | null,
    group_id?: number | null,
    msg: string,
    utm: string,
    [key: string]: any;
    comments: IComments[]
}
