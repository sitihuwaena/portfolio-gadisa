import { excludeSmallBusinessParams, initialProjectState } from "@/types/ProjectTypes"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "..";
import axios from "@/lib/axios";
import { API_URL } from "@/constant/apiUrl";

export const portofolioSlice = createSlice({
    name: 'portofolio',
    initialState: initialProjectState,
    reducers: {
        setSource(state, action) {
            state.source = action.payload.data;
            state.meta = action.payload.meta;
        },
        setDetail(state, action) {
            state.detail = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setLoadingMore(state, action) {
            state.loadingMore = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setParams(state, action) {
            state.params = {
                ...state.params,
                ...action.payload
            }
        },
        resetParams(state) {
            state.meta.pagination = {
                page: 1,
                pageSize: 9,
                pageCount: 0,
                total: 0,
            }
            state.source = [];
            state.params = {
                "pagination[pageSize]": 9,
                "pagination[page]": 1,
                "sort": "endDate:desc",
                ...excludeSmallBusinessParams,
            }
        }
    },
})

export const getProjects = createAsyncThunk<any, void, { dispatch: AppDispatch, state: RootState }>(
    "getProjects/api",
    async (_, { dispatch, rejectWithValue, getState }) => {
        const state = getState();
        const isLoadingMore = state.portofolio.params['pagination[page]'] > 1
        if (isLoadingMore) {
            dispatch(setLoadingMore(true));
        } else {
            dispatch(setLoading(true))
        }
        const params = {
            ...state.portofolio.params,
        }
        return axios.get(API_URL.projects, { params }).then(({ data }) => {
            if (isLoadingMore) {
                dispatch(setSource({
                    data: [...state.portofolio.source, ...data.data],
                    meta: data.meta
                }))
            } else {
                dispatch(setSource({
                    data: data.data,
                    meta: data.meta
                }))
            }
        }).catch(({ response }) => {
            return rejectWithValue(response.data)
        }).finally(() => {
            dispatch(setLoading(false))
            dispatch(setLoadingMore(false))
        })
    }
)

// Action creators are generated for each case reducer function
export const { setLoadingMore, resetParams, setSource, setDetail, setLoading, setError, setParams } = portofolioSlice.actions

export default portofolioSlice.reducer