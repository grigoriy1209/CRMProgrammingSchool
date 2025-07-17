export interface IUser {
    id: number;
    email: string;
    is_staff:boolean;
    is_superuser:boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    last_login: string;
    profile:IProfile | null
}
export interface IProfile {
    id: number;
    name: string;
    surname: string;
    phone: string;

}