import api from "./api";
import Cookies from "js-cookie";
import { User } from "@/types";

export interface LoginResponse {
    status: string;
    message: string;
    data: User;
    access_token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>('/auth/login', {
            email,
            password,
        });
    
        if(response.data.access_token) {
            Cookies.set('access_token', response.data.access_token, { expires: 1});
        }

        return response.data;
    } catch (error){
        throw error;
    }
};

export const logout = () => {
    Cookies.remove('access_token')
};

export const isAuthenticated = (): boolean => {
    return !!Cookies.get('access_token');
};