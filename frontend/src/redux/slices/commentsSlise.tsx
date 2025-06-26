import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../interfaces/commentInterface";
import { IOrder } from "../../interfaces";
import { commentService } from "../../services/commentService";

interface IState {
    comments: IComment[];
    orderInfo: IOrder | null;
    error: string | null;
}

const initialState: IState = {
    comments: [],
    orderInfo: null,
    error: null,
};

const addComment = createAsyncThunk(
    'commentsSlice/addComment',
    async ({ orderId, comment, manager, status }: { orderId: number, comment: string, manager: string, status: string },
           { rejectWithValue }) => {
        try {
            return await commentService.addComments(orderId.toString(), comment, manager, status);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to add comment");
        }
    }
);

const commentsSlice = createSlice({
    name: "commentsSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(addComment.fulfilled, (state, action: PayloadAction<IOrder | null>) => {
                if (action.payload) {
                    state.orderInfo = action.payload;
                    state.comments = action.payload.comments || [];
                    state.error = null;
                }
            })
            .addCase(addComment.rejected, (state, action) => {
                state.error = action.payload as string || "Unknown error";
            })
});

const { reducer: commentReducer, actions } = commentsSlice;
const commentActions = {
    ...actions,
    addComment,
};

export { commentReducer, commentActions };
