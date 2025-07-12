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

    update: async (orderId: string, data: Partial<IOrder> | IOrder,
                   method: 'patch' | 'put' = 'patch'): Promise<IOrder | null> => {
        try {
            const url = urls.application.update(+orderId);
            const response = method === "patch"
                ? await apiServices.patch<IOrder>(url, data)
                : await apiServices.put<IOrder>(url, data);
            return response.data;
        } catch (error) {
            return null;
        }
    },

}
export {
    orderServices,
}
