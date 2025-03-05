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
    manager: number,
    group: number,
    msg: string,
    utm: string,
    [key: string]: any;
    comments: IComments[]
}
export interface IComments {
    id: number,
    author: string,
    text: string,
    created_at: string,
}