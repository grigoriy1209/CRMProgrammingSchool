import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGroup} from "../../interfaces";
import {groupServices} from "../../services/groupServices";

interface IState {
    groups: IGroup[];
    loading: boolean;
    error: string | null;

}

const groupState: IState = {
    groups: [],
    loading: false,
    error: null,

}
const getAllGroup = createAsyncThunk(
    'groups/getAllGroup', groupServices.getAllGroups
)
const createGroup = createAsyncThunk(
    'groups/create',
    async (data: { name: string }, {rejectWithValue}) => {
        try {
            return await groupServices.createGroup(data);
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Érror creating group');

        }
    }
)

const groupSlice = createSlice({
    name: "groups",
    initialState: groupState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllGroup.fulfilled, (state, action) => {
                state.groups = action.payload
                state.loading = false
            })
            .addCase(getAllGroup.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllGroup.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Error'
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.groups.push(action.payload)
            })
    }
})
const {reducer: groupReducer, actions} = groupSlice;

const groupActions = {
    ...actions,
    getAllGroup,
    createGroup,
}
export {
    groupReducer,
    groupActions,
}