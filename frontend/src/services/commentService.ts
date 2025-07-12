import {IComments} from "../interfaces/commentInterface";
import {apiServices} from "./apiServices";

const commentService = {
    getComments:async (orgId: string): Promise<IComments[]> => {
         const response = await apiServices.get(`/comments?${orgId}`);
         return response.data;
    },
    addComment: async (orderId:string, comment:string):Promise<IComments> => {
        const response = await apiServices.post(`/comments?${orderId}/`,{comment:comment});
        return response.data;
    }
}
export {
    commentService
}
