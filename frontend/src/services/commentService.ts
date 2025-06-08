import {IOrder} from "../interfaces";
import {apiServices} from "./apiServices";
import {urls} from "../constants/urls";

const commentService = {

    addComments: async (orderId: string, comment: string, manager: string, status: string): Promise<IOrder | null> => {
        try {
            const response = await apiServices.post<IOrder>(urls.application.addComment(+orderId), {
                comment,
                manager,
                status
            });
            return response.data;

        } catch (error) {
            return null;
        }
    }
}
export {
    commentService,
}