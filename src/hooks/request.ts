import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";

export function useURLParams() {
    const location = useLocation();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(location.search);
            params.set(name, value);
            return params.toString();
        },
        [location.search]
    );

    const removeQueryString = useCallback(
        (name: string) => {
            const params = new URLSearchParams(location.search);
            params.delete(name);
            return params.toString();
        },
        [location.search]
    );

    const createQueryStringMany = useCallback(
        (inputParams: { name: string; value: string }[]) => {
            const params = new URLSearchParams(location.search);
            inputParams.forEach((param) => {
                params.set(param.name, param.value);
            });
            return params.toString();
        },
        [location.search]
    );

    const appendSearchParams = (paramKey: string, paramValue: string) => {
        const newQueryString = createQueryString(paramKey, paramValue);
        return newQueryString;
    };

    const removeSearchParams = (paramKey: string) => {
        const newQueryString = removeQueryString(paramKey);
        return newQueryString;
    };

    const addMultipleSearchParams = (
        params: { name: string; value: string }[]
    ) => {
        const newQueryString = createQueryStringMany(params);
        return newQueryString;
    };

    return {
        appendSearchParams,
        removeSearchParams,
        addMultipleSearchParams,
    };
}

export function useGetSearchParamValue(
    paramKey: string,
    defaultValue: string = ""
) {
    const searchParams = new URLSearchParams(window.location.search);
    const paramValue = searchParams.get(paramKey) || defaultValue;
    return paramValue;
}
