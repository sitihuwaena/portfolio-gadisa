import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import experienceSlice from "./slices/experienceSlice";
import educationSlice from "./slices/educationSlice";
import skillSlice from "./slices/skillSlice";
import projectSlice from "./slices/projectSlice";


export const store = configureStore({
    reducer: {
        experience: experienceSlice,
        education: educationSlice,
        skill: skillSlice,
        project: projectSlice
    }
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch