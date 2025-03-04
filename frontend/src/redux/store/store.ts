import {configureStore} from "@reduxjs/toolkit";
import {orderReducer} from "../slices/ordersSlice";



const store = configureStore({
    reducer:{
        orders:orderReducer,

    }
})

export {store}

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type {
    RootState,
    AppDispatch
}