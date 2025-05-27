import {configureStore} from "@reduxjs/toolkit";
import {orderReducer} from "../slices/ordersSlice";
import {usersSlice} from "../slices/usersSlice";
import {groupReducer} from "../slices/groupSlice";


const store = configureStore({
    reducer: {
        orders: orderReducer,
        users: usersSlice.reducer,
        groups:groupReducer

    }
})

export {store}

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type {
    RootState,
    AppDispatch
}