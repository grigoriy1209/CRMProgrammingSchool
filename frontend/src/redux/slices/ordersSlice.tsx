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
        try {
            return await orderServices.byId(id);
        } catch (e) {
            const error = e as AxiosError;
            if (error.response?.status === 404) {
                return rejectWithValue("Order not found");
            }
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

const updateOrder = createAsyncThunk<
    IOrder,
    { orderId: string; data: Partial<IOrder> | IOrder; method: 'patch' | 'put' },
    { rejectValue: string }>(
    'orderSlice/updateOrder',
    async ({orderId, data, method}, {rejectWithValue}) => {
        try {
            const updated = await orderServices.update(orderId, data, method);
            if (!updated) {
                return rejectWithValue("Update failed");
            }
            return updated;
        } catch (e: any) {
            return rejectWithValue(e.message || "Unknown error");
        }
    }
)


const setOrderInfo = (state: IState, action: PayloadAction<IOrder>) => {
    state.orderInfo = action.payload;
};
const handleRejected = (state: IState, action: any) => {
    state.error = action.payload || "Unknown error";
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
                state.orders = state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order);

            })
            .addCase(getAll.rejected, handleRejected)
            .addCase(getById.rejected, handleRejected)
            .addCase(updateOrder.rejected, (state, action) => {
                state.error = action.payload as string;
            })


});

const {reducer: orderReducer, actions} = ordersSlice;

const orderActions = {
    ...actions,
    getAll,
    getById,
    updateOrder,
};

export {orderActions, orderReducer};
