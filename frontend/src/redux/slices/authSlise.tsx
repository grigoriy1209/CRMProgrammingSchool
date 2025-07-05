import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IToken} from "../../interfaces/tokenInterfaces";
import {authServices} from "../../services/authServices";
import {IAuth} from "../../interfaces";

interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    token: IToken | null;
}

const initialState: AuthState = {
    isAuthenticated: !!authServices.getAccessToken(),
    loading: false,
    error: null,
    token: authServices.getAccessToken() && authServices.getRefreshToken() ? {
        access: authServices.getAccessToken()!,
        refresh: authServices.getRefreshToken()!,
    } : null
}

const login = createAsyncThunk<IToken, IAuth>(
    "auth/login",
    async (user, { rejectWithValue }) => {
        try{
            return await authServices.login(user);
        }catch(e:any){
            return rejectWithValue(e.response?.data?.message || "Login error");
        }
    }
);


const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers:(builder) =>{
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = {
                    access: action.payload.access,
                    refresh: action.payload.refresh,
                };
            })
    }

})
const {reducer:authReducer,actions} = authSlice;

const authActions = {
    ...actions,
    login,
}
export {authActions, authReducer};