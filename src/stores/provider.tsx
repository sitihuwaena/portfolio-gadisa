"use client";
import { AppProgressBar } from "next-nprogress-bar";
import { store } from "./store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AppProgressBar
                height="3px"
                color="#279EFF"
                options={{ showSpinner: false }}
                shallowRouting
            />
            {children}
        </Provider>
    );
}