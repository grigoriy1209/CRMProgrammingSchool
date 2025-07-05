import {configureStore} from "@reduxjs/toolkit";
import {orderReducer} from "../slices/ordersSlice";
import {usersSlice} from "../slices/usersSlice";
import {groupReducer} from "../slices/groupSlice";
import {commentReducer} from "../slices/commentsSlise";
import {authReducer} from "../slices/authSlise";


const store = configureStore({
    reducer: {
        auth:authReducer,
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