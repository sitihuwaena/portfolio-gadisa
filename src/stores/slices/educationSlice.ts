import { InitialEducation } from "@/types/educationTypes.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "@/libraries/axios";

const educationSlice = createSlice({
    name: "educationSlice",
    initialState: InitialEducation,
    reducers: {
        setLoading(state, { payload }) {
            state.loading = payload
        },
        setEducations(state, { payload }) {
            state.source = payload.source
            state.loading = false
        }
    }
})

export const getEducations = createAsyncThunk<any, void, { dispatch: AppDispatch }>(
    "education/api",
    async (_, { dispatch }) => {
        dispatch(setLoading(true))
        return axios.get("/api/educations?sort=from:desc").then(({ data }) => {
            dispatch(setEducations({
                source: data.data
            }))
        })
    }
)

export const { setEducations, setLoading } = educationSlice.actions
export default educationSlice.reducer