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
    }

}
export {
    orderServices,
}