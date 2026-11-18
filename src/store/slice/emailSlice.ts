import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "..";
import axios from "@/lib/axios";
import { API_URL } from "@/constant/apiUrl";
import { EmailTypes } from "@/types/EmailTypes";

export const emailSlice = createSlice({
    name: 'email',
    initialState: {},
    reducers: {},
})

export const postReachMe = createAsyncThunk<any, EmailTypes, { dispatch: AppDispatch, state: RootState }>(
    "postReachMe/api",
    async (payload, { rejectWithValue, fulfillWithValue }) => {
        return axios.post(API_URL.email, payload).then(({ data }) => {
            return fulfillWithValue(data)
        }).catch(({ response }) => {
            return rejectWithValue(response.data)
        })
    }
)

// Action creators are generated for each case reducer function
export const { } = emailSlice.actions

export default emailSlice.reducer