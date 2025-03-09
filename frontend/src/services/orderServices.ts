import {apiServices} from "./apiServices";
import {urls} from "../constants/urls";
import {IOrder, IOrderPagination} from "../interfaces";

const orderServices = {
    getAll: async (page: string = "1"): Promise<IOrderPagination<IOrder> | null> => {
        try {
            const response = await apiServices.get<IOrderPagination<IOrder>>(urls.application.base, { params: { page: Number(page) } });
            console.log("Response:", response);
            return response.data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            return null;
        }
    },
    byId:async (id:string):Promise<IOrder> => {
        const response = await apiServices.get<IOrder>(urls.application.byId(+id));
        console.log("Response_ID:", response);
        return response.data;
    },
    addComments: async (id:string, comment:string, manager:string, status:string):Promise<IOrder | null> => {
        try {
            const response = await apiServices.post<IOrder>(urls.addComment.addComment(+id),{
                comment,
                manager,
                status
            });
            return response.data;
        }catch (error){
            console.error("Error adding comments:", error);
            return null;
        }
    }
}
export {
    orderServices,
}
