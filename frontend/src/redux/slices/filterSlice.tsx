import {createSlice} from "@reduxjs/toolkit";
interface  FilterState {
    name: string;
    age_gt?:number;
    age_lt?:number;
    ordering?:string
}
const slice = createSlice({
    name: "filters",
    initialState: {},
    reducers:{}
})