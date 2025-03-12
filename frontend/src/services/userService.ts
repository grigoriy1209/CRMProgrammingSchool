import {IUser} from "../interfaces";
import {apiServices} from "./apiServices";
import {urls} from "../constants/urls";

const userService = {
    getAll: async (): Promise<IUser[]> => {
        const response = await apiServices.get<IUser[]>(urls.users.base);
        return response.data
    },
    getById: async (id: number): Promise<IUser> => {
        const response = await apiServices.get<IUser>(urls.users.byId(id));
        return response.data
    }
}
export {
    userService
} ;