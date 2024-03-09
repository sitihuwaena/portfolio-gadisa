import { i18nRouter } from "next-i18n-router";
import { i18nConfig } from "./libraries/locale";
import { NextRequest } from "next/server";

export default function Middleware(request: NextRequest) {
    return i18nRouter(request, i18nConfig)
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)'
}