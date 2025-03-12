import {configureStore} from "@reduxjs/toolkit";
import {orderReducer} from "../slices/ordersSlice";
import {usersSlice} from "../slices/usersSlice";


const store = configureStore({
    reducer: {
        orders: orderReducer,
        users: usersSlice.reducer

    }
})

export {store}

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type {
    RootState,
    AppDispatch
}