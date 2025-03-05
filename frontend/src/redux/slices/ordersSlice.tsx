import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrder, IOrderPagination} from "../../interfaces";
import {orderServices} from "../../services/orderServices";

interface IState {
    orders: IOrder[];
    current_page: number;
    pagination: IOrderPagination<IOrder> | null;
    order: IOrder | null;
    error: string | null;

}

let orderInitialState: IState = {
    orders: [],
    current_page: 1,
    pagination: null,
    order: null,
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


const ordersSlice = createSlice({
    name: "ordersSlice",
    initialState: orderInitialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action: PayloadAction<IOrderPagination<IOrder>>) => {
                state.orders = action.payload.result
                state.pagination = {
                    total_items: action.payload.total_items,
                    total_pages: action.payload.total_pages,
                    current_page: action.payload.current_page,
                    prev: action.payload.prev,
                    next: action.payload.next,
                    result: action.payload.result
                }
                state.current_page = action.payload.current_page
                state.error = null
            })
})

const {reducer: orderReducer, actions} = ordersSlice

const orderActions = {
    ...actions,
    getAll,
}
export {
    orderActions,
    orderReducer,
}