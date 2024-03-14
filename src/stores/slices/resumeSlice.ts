import { InitialResume } from "@/types/resumeTypes.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "@/libraries/axios";
import { error } from "console";

const resumeSlice = createSlice({
    name: "resumeSlice",
    initialState: InitialResume,
    reducers: {
        setLoading(state, { payload }) {
            state.loading = payload
        },
        setResume(state, { payload }) {
            state.error = payload.error
            state.message = payload.message
            state.loading = false
        },
        resetResume(state) {
            state.error = InitialResume.error
            state.loading = InitialResume.loading
            state.message = InitialResume.message
        }
    }
})

export const getResume = createAsyncThunk<any, any, { dispatch: AppDispatch }>(
    "resume/api",
    async (payload, { dispatch }) => {
        dispatch(setLoading(true))
        return axios.post("/api/email-viewer/request-resume", payload).then(({ data }) => {
            dispatch(setResume({
                error: false,
                message: data.message
            }))
        }).catch((error) => {
            dispatch(setResume({
                error: true,
                message: error.response?.data?.message
            }))
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }
)

export const { setResume, setLoading, resetResume } = resumeSlice.actions
export default resumeSlice.reducer