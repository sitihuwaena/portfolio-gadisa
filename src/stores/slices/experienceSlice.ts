import { InitialExperience } from "@/types/experienceTypes.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "@/libraries/axios";

const experienceSlice = createSlice({
    name: "experienceSlice",
    initialState: InitialExperience,
    reducers: {
        setLoading(state, { payload }) {
            state.loading = payload
        },
        setExperiences(state, { payload }) {
            state.source = payload.source
            state.loading = false
        }
    }
})

export const getExperiences = createAsyncThunk<any, void, { dispatch: AppDispatch }>(
    "experience/api",
    async (_, { dispatch }) => {
        dispatch(setLoading(true))
        return axios.get("/api/experiences?sort=from:desc").then(({ data }) => {
            dispatch(setExperiences({
                source: data.data
            }))
        })
    }
)

export const { setExperiences, setLoading } = experienceSlice.actions
export default experienceSlice.reducer