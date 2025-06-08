import {configureStore} from "@reduxjs/toolkit";
import {orderReducer} from "../slices/ordersSlice";
import {usersSlice} from "../slices/usersSlice";
import {groupReducer} from "../slices/groupSlice";
import {commentReducer} from "../slices/commentsSlise";


const store = configureStore({
    reducer: {
        orders: orderReducer,
        users: usersSlice.reducer,
        groups:groupReducer,
        comments:commentReducer,

    }
})

export {store}

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type {
    RootState,
    AppDispatch
}