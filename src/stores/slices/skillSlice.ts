import { InitialSkill } from "@/types/skillTypes.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "@/libraries/axios";

const skillSlice = createSlice({
    name: "skillSlice",
    initialState: InitialSkill,
    reducers: {
        setLoading(state, { payload }) {
            state.loading = payload
        },
        setSkills(state, { payload }) {
            state.source = payload.source
            state.loading = false
        }
    }
})

export const getSkills = createAsyncThunk<any, void, { dispatch: AppDispatch }>(
    "skill/api",
    async (_, { dispatch }) => {
        dispatch(setLoading(true))
        return axios.get("/api/skills").then(({ data }) => {
            dispatch(setSkills({
                source: data.data
            }))
        })
    }
)

export const { setSkills, setLoading } = skillSlice.actions
export default skillSlice.reducer