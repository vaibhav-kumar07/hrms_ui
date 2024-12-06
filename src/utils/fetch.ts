import { getCookieValue, setCookie } from "./cookies";
import { handleApiError } from "./errorHandler";

const updateTokenAndRedirect = () => {
    setCookie("token", "");
    window.location.href = '/login';
};

export type RequestOptions = {
    isWithToken: boolean;
    isWithCache?: boolean;
};

export const get = async (url: string, requestOptions: RequestOptions): Promise<any> => {
    try {
        const requestInput = _getRequestInput("GET", null, requestOptions);

        const rawResponse = await fetch(url, requestInput);

        if (rawResponse.status === 401) {
            updateTokenAndRedirect();
            return;
        }
        const result = await rawResponse.json();

        if (!rawResponse.ok || result.error_type) {
            throw result;
        }

        return result;
    } catch (error: any) {
        const apiError = handleApiError(error);
        throw apiError;
    }
};

export const post = async (url: string, body: any, requestOption: RequestOptions): Promise<any> => {
    try {
        const requestInput = _getRequestInput("POST", body, requestOption);

        const rawResponse = await fetch(url, requestInput);
        if (rawResponse.status === 401) {
            updateTokenAndRedirect();
            return;
        }

        const result = await rawResponse.json();

        if (!rawResponse.ok || result.error_type) {
            throw result;
        }

        return result;
    } catch (error: any) {
        const apiError = handleApiError(error);
        throw apiError;
    }
};

export const put = async (url: string, body: any, requestOption: RequestOptions): Promise<any> => {
    try {
        const requestInput = _getRequestInput("PUT", body, requestOption);

        const rawResponse = await fetch(url, requestInput);
        if (rawResponse.status === 401) {
            updateTokenAndRedirect();
            return;
        }

        const result = await rawResponse.json();

        if (!rawResponse.ok || result.error_type) {
            throw result;
        }

        return result;
    } catch (error: any) {
        const apiError = handleApiError(error);
        throw apiError;
    }
};

export const patch = async (url: string, body: any, requestOption: RequestOptions): Promise<any> => {
    try {
        const requestInput = _getRequestInput("PATCH", body, requestOption);

        const rawResponse = await fetch(url, requestInput);
        if (rawResponse.status === 401) {
            updateTokenAndRedirect();
            return;
        }

        const result = await rawResponse.json();

        if (!rawResponse.ok || result.error_type) {
            throw result;
        }

        return result;
    } catch (error: any) {
        const apiError = handleApiError(error);
        throw apiError;
    }
};

// Helper function to build request input
const _getRequestInput = (method: string, body: any, options: RequestOptions): RequestInit => {
    const requestInput: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (body) {
        requestInput.body = JSON.stringify(body);
    }

    if (options.isWithToken) {
        const token = getCookieValue("token");
        if (!token) {
            throw new Error("Token not found");
        }
        requestInput.headers = {
            ...requestInput.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    return requestInput;
};
