import {IUser} from "../../interfaces";
import {createAsyncThunk, createSlice, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {userService} from "../../services/userService";
import {AxiosError} from "axios";

type UsersSliceType = {
    users: IUser[];
    isLoader: boolean;
    error: string;
    user: IUser | null;
}
const initialState: UsersSliceType = {
    users: [],
    isLoader: false,
    error: '',
    user: null
}

const loadUsers = createAsyncThunk(
    'usersSlice/loadUsers',
    async (_, thunAPI) => {
        try {
            const users = await userService.getAll();
            return thunAPI.fulfillWithValue(users);
        } catch (e) {
            let error = e as AxiosError;
            return thunAPI.rejectWithValue(error?.response?.data);
        }
    })
const loadUser = createAsyncThunk(
    'userSlice/loadUser',
    async (id:number, thunkAPI)=>{
        try {
            const user = await userService.getById(id);
            return thunkAPI.fulfillWithValue(user);
        }catch (e){
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    })

export const usersSlice = createSlice({
    name: "usersSlice",
    initialState: initialState,
    reducers: {
        fillUser: (state, action) => {
            state.user = action.payload;
        },
        refillUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(
                loadUsers.fulfilled,
                (state, action) => {
                    state.users = action.payload;
                    state.isLoader = true;
                }
            )
            .addCase(loadUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addMatcher(
                isRejected(loadUsers,loadUser),
                (state, action) => {
                    state.error = action.payload as string;
                }
            )

});
export const userAction ={
    ...usersSlice.actions,
    loadUser,
    loadUsers,
}