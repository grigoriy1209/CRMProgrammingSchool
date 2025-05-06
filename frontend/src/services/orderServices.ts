import {apiServices} from "./apiServices";
import {urls} from "../constants/urls";
import {IOrder, IOrderPagination} from "../interfaces";

const orderServices = {
    getAll: async (page: string = "1"): Promise<IOrderPagination<IOrder> | null> => {
        try {
            const response = await apiServices.get<IOrderPagination<IOrder>>(urls.application.base, {params: {page: Number(page)}});
            console.log("Response:", response);
            return response.data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            return null;
        }
    },
    byId: async (orderId: string): Promise<IOrder> => {
        try {
            const response = await apiServices.get<IOrder>(urls.application.byId(+orderId));
            console.log("Response_ID:", response);
            return response.data;
        }catch (error){
            console.error("Error fetching order:", error);
            throw error;
        }

    },
    
    update: async (orderId: string, data:Partial<IOrder>): Promise<IOrder | null > => {
        try {
            const response = await apiServices.patch<IOrder>(urls.application.update(+orderId),data);
            return response.data;
        }catch (error){
            console.error("Error updating order:", error);
            return null;
        }
    },
    
    
    addComments: async (orderId: string, comment: string, manager: string, status: string): Promise<IOrder | null> => {
        try {
            const response = await apiServices.post<IOrder>(urls.application.addComment(+orderId), {
                comment,
                manager,
                status
            });
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error("Error adding comments:", error);
            return null;
        }
    }
}
export {
    orderServices,
}
