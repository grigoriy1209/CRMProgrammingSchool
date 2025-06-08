import {IGroup} from "../interfaces";

import {urls} from "../constants/urls";
import {apiServices} from "./apiServices";

const groupServices = {
    getAllGroups: async (): Promise<IGroup[]> => {
        const response = await apiServices.get<IGroup[]>(urls.group.base);
        return response.data;
    },
    createGroup: async (data: { name: string }): Promise<IGroup> => {
        const response = await apiServices.post(urls.group.base,data);
        return response.data;
    }

}
export {
    groupServices
}