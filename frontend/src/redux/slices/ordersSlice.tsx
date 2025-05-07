import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrder, IOrderPagination} from "../../interfaces";
import {orderServices} from "../../services/orderServices";
import {AxiosError} from "axios";

interface IState {
    orders: IOrder[];
    current_page: number;
    pagination: IOrderPagination<IOrder> | null;
    orderInfo: IOrder | null;
    error: string | null;
}

let orderInitialState: IState = {
    orders: [],
    current_page: 1,
    pagination: null,
    orderInfo: null,
    error: null
};


const getAll = createAsyncThunk<IOrderPagination<IOrder>, number, { rejectValue: string }>(
    'orderSlice/getAll',
    async (page, {rejectWithValue}) => {
        try {
            const response = await orderServices.getAll(page.toString());
            if (!response) {
                return rejectWithValue("No data received");
            }
            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
        }
    }
);


const getById = createAsyncThunk<IOrder, string, { rejectValue: string }>(
    'orderSlice/byId',
    async (id, {rejectWithValue}) => {
        if (!id) {
            return rejectWithValue("ID is required");
        }
        try {
            const order = await orderServices.byId(id);
            if (!order) {
                return rejectWithValue("Order not found");
            }
            return order;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

const updateOrder = createAsyncThunk(
    'orderSlice/updateOrder',
    async ({orderId, data}: { orderId: string, data: Partial<IOrder> }, {rejectWithValue}) => {
        try {
            const updated = await orderServices.update(orderId, data);
            if (!updated) {
                return rejectWithValue("not update");
            }
            return updated;
        } catch (e: any) {
            return rejectWithValue(e.message || "Unknown error");
        }

    }
)
const allUpdateOrders = createAsyncThunk(
    'orderSlice/allUpdateOrders',
    async ({orderId, data}: { orderId: string, data: IOrder }, {rejectWithValue}) => {
        try {
            const allUpdate = await orderServices.allUpdate(orderId, data);
            if (!allUpdate) {
                return rejectWithValue("No data received");
            }
            return allUpdate;
        } catch (e: any) {
            return rejectWithValue(e.message || "Unknown error");
        }
    }
)

const addComment = createAsyncThunk(
    'orderSlice/addComment',
    async ({orderId, comment, manager, status}: { orderId: number, comment: string, manager: string, status: string },
           {rejectWithValue}) => {
        try {
            const response = await orderServices.addComments(orderId.toString(), comment, manager, status);
            return response
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to add comment")
        }
    }
)

const setOrderInfo = (state: IState, action: PayloadAction<IOrder>) => {
    state.orderInfo = action.payload;
};

const ordersSlice = createSlice({
    name: "ordersSlice",
    initialState: orderInitialState,
    reducers: {
        setOrderInfo,
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action: PayloadAction<IOrderPagination<IOrder>>) => {
                state.orders = action.payload.result;
                state.pagination = {
                    total_items: action.payload.total_items,
                    total_pages: action.payload.total_pages,
                    current_page: action.payload.current_page,
                    prev: action.payload.prev,
                    next: action.payload.next,
                    result: action.payload.result,
                };
                state.current_page = action.payload.current_page;
                state.error = null;
            })
            .addCase(getById.fulfilled, (state, action: PayloadAction<IOrder>) => {
                state.orderInfo = action.payload;
            })
            .addCase(updateOrder.fulfilled, (state, action: PayloadAction<IOrder>) => {
                state.orderInfo = action.payload;
            })
            .addCase(allUpdateOrders.fulfilled,(state, action: PayloadAction<IOrder>) => {
                state.orderInfo = action.payload;
            })
            .addCase(addComment.fulfilled, (state, action: PayloadAction<IOrder | null>) => {
                if (action.payload) {
                    state.orderInfo = action.payload;
                    state.error = null;
                }
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(getById.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(allUpdateOrders.rejected, (state, action) => {
                state.error = action.payload as string;
            })

});

const {reducer: orderReducer, actions} = ordersSlice;

const orderActions = {
    ...actions,
    getAll,
    getById,
    addComment,
    updateOrder,
    allUpdateOrders,
};

export {orderActions, orderReducer};
