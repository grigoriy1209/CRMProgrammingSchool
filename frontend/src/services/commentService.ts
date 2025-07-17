import {IComments} from "../interfaces/commentInterface";
import {apiServices} from "./apiServices";

const commentService = {
    getComments: async (orderId: string): Promise<IComments[]> => {
        const response = await apiServices.get('/comments', {
            params: { orderId }
        });
        return response.data;
    },
    addComment: async (orderId: string, comment: string): Promise<IComments> => {
        const response = await apiServices.post('/comments/', {
            orderId,
            comment,
        });
        return response.data;
    },
};
export {commentService}