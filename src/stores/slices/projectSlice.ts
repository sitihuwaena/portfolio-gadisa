import { InitialProject } from "@/types/projectTypes.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "@/libraries/axios";

const projectSlice = createSlice({
    name: "projectSlice",
    initialState: InitialProject,
    reducers: {
        setLoading(state, { payload }) {
            state.loading = payload
        },
        setProjects(state, { payload }) {
            state.source = payload.source
            state.loading = false
        }
    }
})

export const getProjects = createAsyncThunk<any, void, { dispatch: AppDispatch }>(
    "project/api",
    async (_, { dispatch }) => {
        dispatch(setLoading(true))
        return axios.get("/api/projects").then(({ data }) => {
            dispatch(setProjects({
                source: data.data
            }))
        })
    }
)

export const { setProjects, setLoading } = projectSlice.actions
export default projectSlice.reducer