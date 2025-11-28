import axiosInstance from './axiosConfig'; // Import your configured instance
import type { SignInForm, SignupForm } from '../types/user';

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
}

export const signIn = async (formData: SignInForm): Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.post('/user/sign-in', formData, {
            withCredentials: true // Important for cookies if using httpOnly tokens
        });

        

        return response.data
    } catch (error: any) {
        return error.response?.data
    }
};

export const signUp = async (formData: SignupForm): Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.post('/user/sign-up', formData);

        return response.data
    } catch (error: any) {
        return error.response?.data
    }
};

export const googleSignIn = async () => {
    try {
        const response = await axiosInstance.get('/user/google', {
            withCredentials: true,
            // maxRedirects: 0, 
            // validateStatus: function (status) {
            //     return status >= 200 && status < 303; 
            // }
        });

        return response.data;
        
    } catch (error: any) {
        return { 
            success: false, 
            message: error.response?.data?.message || "Login failed" 
        };
    }
}

// export const googleCallback = async () => {
//     try {
//         const response = await axiosInstance.get('/user/google/callback', {
//             withCredentials: true
//         });
//         return response.data
//     } catch (error: any) {
//         return error.response?.data
//     }
// }