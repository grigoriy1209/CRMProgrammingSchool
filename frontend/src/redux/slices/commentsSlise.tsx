import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComments } from "../../interfaces/commentInterface";
import { commentService } from "../../services/commentService";

interface IState {
    comments: IComments[];
    error: string | null;
}

const initialState: IState = {
    comments: [],
    error: null,
};

// Отримати всі коментарі до заявки
const getComments = createAsyncThunk<IComments[], number>(
    'commentsSlice/getComments',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await commentService.getComments(orderId.toString());
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch comments');
        }
    }
);

// Додати коментар
const addComment = createAsyncThunk<IComments, { orderId: number; comment: string }>(
    'commentsSlice/addComment',
    async ({ orderId, comment }, { rejectWithValue }) => {
        try {
            return await commentService.addComment(orderId.toString(), comment);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to add comment');
        }
    }
);

// Slice
const commentsSlice = createSlice({
    name: "commentsSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getComments.fulfilled, (state, action: PayloadAction<IComments[]>) => {
                state.comments = action.payload;
                state.error = null;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.error = action.payload as string || "Unknown error";
            })
            .addCase(addComment.fulfilled, (state, action: PayloadAction<IComments>) => {
                state.comments.push(action.payload); // просто додаємо новий коментар
                state.error = null;
            })
            .addCase(addComment.rejected, (state, action) => {
                state.error = action.payload as string || "Unknown error";
            })
});

const { reducer: commentReducer } = commentsSlice;
const commentActions = {
    getComments,
    addComment,
};

export { commentReducer, commentActions };
