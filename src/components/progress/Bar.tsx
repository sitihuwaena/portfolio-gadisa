"use client"

import { AppProgressBar } from "next-nprogress-bar";

export default function ProgressBar() {

    return (
        <AppProgressBar
            height="3px"
            color="#3692D8"
            options={{ showSpinner: false }}
            shallowRouting
        />
    )
}