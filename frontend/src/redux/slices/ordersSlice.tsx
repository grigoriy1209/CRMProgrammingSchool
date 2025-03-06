import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder, IOrderPagination } from "../../interfaces";
import { orderServices } from "../../services/orderServices";
import { AxiosError } from "axios";

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

// Async thunk для отримання всіх замовлень
const getAll = createAsyncThunk<IOrderPagination<IOrder>, number, { rejectValue: string }>(
    'orderSlice/getAll',
    async (page, { rejectWithValue }) => {
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

// Async thunk для отримання замовлення за ID
const getById = createAsyncThunk<IOrder, string, { rejectValue: string }>(
    'orderSlice/byId',
    async (id, { rejectWithValue }) => {
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

// Додавання екшну для збереження інформації про замовлення в orderInfo
const setOrderInfo = (state: IState, action: PayloadAction<IOrder>) => {
    state.orderInfo = action.payload;
};

const ordersSlice = createSlice({
    name: "ordersSlice",
    initialState: orderInitialState,
    reducers: {
        setOrderInfo, // додаємо екшн для збереження інформації
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
                state.orderInfo = action.payload; // Оновлюємо orderInfo при отриманні замовлення
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload as string; // Обробка помилки
            })
            .addCase(getById.rejected, (state, action) => {
                state.error = action.payload as string; // Обробка помилки
            })
});

const { reducer: orderReducer, actions } = ordersSlice;

const orderActions = {
    ...actions,
    getAll,
    getById,
};

export { orderActions, orderReducer };
