import {configureStore} from "@reduxjs/toolkit";



const store = configureStore({
    reducer:{

    }
})

export {store}

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type {
    RootState,
    AppDispatch
}