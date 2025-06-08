import {apiServices} from "./apiServices";
import {urls} from "../constants/urls";
import {IOrder, IOrderPagination} from "../interfaces";

const orderServices = {
    getAll: async (page: string = "1"): Promise<IOrderPagination<IOrder> | null> => {
        try {
            const response = await apiServices.get<IOrderPagination<IOrder>>(urls.application.base, {params: {page: Number(page)}});
            return response.data;
        } catch (error) {
            return null;
        }
    },
    byId: async (orderId: string): Promise<IOrder> => {
        try {
            const response = await apiServices.get<IOrder>(urls.application.byId(+orderId));
            return response.data;
        } catch (error) {
            throw error;
        }

    },

    update: async (orderId: string, data: Partial<IOrder>): Promise<IOrder | null> => {
        try {
            const response = await apiServices.patch<IOrder>(urls.application.update(+orderId), data);
            return response.data;
        } catch (error) {
            return null;
        }
    },


    allUpdateOrder: async (orderId: string,data:IOrder): Promise<IOrder | null> => {
        try {
            const response = await apiServices.put<IOrder>(urls.application.update(+orderId), data);
            return response.data
        } catch (error) {
            return null
        }
    },

}
export {
    orderServices,
}
