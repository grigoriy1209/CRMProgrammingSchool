export interface IUser {
    id: number;
    email: string;
    is_active: boolean;
    profile:IProfile
}
export interface IProfile {
    id: number;
    name: string;
    surname: string;
    phone: string;

}