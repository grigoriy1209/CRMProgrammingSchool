import {IGroup} from "../interfaces";
import axios from "axios";
import {urls} from "../constants/urls";

const groupServices = {
    getAllGroups: async (): Promise<IGroup[]> => {
        const response = await axios.get<IGroup[]>(urls.group.base);
        console.log(response.data);
        return response.data;
    },
    createGroup: async (data: { name: string }): Promise<IGroup> => {
        const response = await axios.post(urls.group.base);
        console.log(response);
        return response.data;
    }

}
export {
    groupServices
}