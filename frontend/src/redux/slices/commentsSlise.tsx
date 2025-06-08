import {IComment} from "../../interfaces/commentInterface";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrder} from "../../interfaces";
import {commentService} from "../../services/commentService";

interface IState {
    comments: IComment[];
    orderInfo: IOrder | null;
    error: string | null;
}

let commentInitialState: IState = {
    comments: [],
    orderInfo: null,
    error: null
}
const addComment = createAsyncThunk(
    'orderSlice/addComment',
    async ({orderId, comment, manager, status}: { orderId: number, comment: string, manager: string, status: string },
           {rejectWithValue}) => {
        try {
            return await commentService.addComments(orderId.toString(), comment, manager, status)
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to add comment")
        }
    }
)

const setOrderInfo = (state: IState, action: PayloadAction<IOrder>) => {
    state.orderInfo = action.payload;
};
const handleRejected = (state: IState, action: any) => {
    state.error = action.payload || "Unknown error";
};

const commentsSlice = createSlice({
    name: "commentsSlice",
    initialState: commentInitialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(addComment.fulfilled, (state, action: PayloadAction<IOrder | null>) => {
                if (action.payload) {
                    state.orderInfo = action.payload;
                    state.error = null;
                }
            })
            .addCase(addComment.rejected, handleRejected)
})

const {reducer: commentReducer, actions} = commentsSlice;
const commentActions = {
    ...actions,
    addComment,
}
export {commentReducer, commentActions}