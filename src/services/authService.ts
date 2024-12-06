
import * as FetchUtils from '../utils/fetch';

// const backendUrl = process.env.REACT_APP_BACKEND_URL;
const backendUrl = "http://localhost:6001"



export const registerUser = async ({ name, email, password }: {
    name: string, email: string, password: string
}) => {
    const response = await FetchUtils.post(`${backendUrl}/api/auth/register`, { name, email, password }, { isWithToken: false });
    return response;
};


export const loginUser = async ({ email, password }: {
    email: string, password: string
}) => {
    const response = await FetchUtils.post(`${backendUrl}/api/auth/login`, { email, password }, { isWithToken: false });
    return response;
};
