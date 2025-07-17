import {IComments} from "../interfaces/commentInterface";
import {apiServices} from "./apiServices";
import {urls} from "../constants/urls";

const commentService = {
    getComments: async (orderId: string): Promise<IComments[]> => {
        const response = await apiServices.get(urls.application.getComments(+orderId));
        return response.data;
    },
    addComment: async (orderId: string, comment: string): Promise<IComments> => {
        const response = await apiServices.post(urls.application.addComment(+orderId),
            {comment: comment});
        return response.data;
    },
};
export {commentService}