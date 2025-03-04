import {apiServices} from "./apiServices";
import {urls} from "../constants/urls";
import {IOrder, IOrderPagination} from "../interfaces";

const orderServices = {
    getAll: async (page: string): Promise<IOrderPagination<IOrder>> => {
        const response = await apiServices.get<IOrderPagination<IOrder>>(urls.application.base, {params: {page}});
        return response.data
    }
}
export {
    orderServices,
}