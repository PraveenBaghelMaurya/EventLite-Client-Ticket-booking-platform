import axiosInstance from './axiosConfig'; // Import your configured instance
import type { SignInForm, SignupForm } from '../types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse } from '../types/apiResponse';

export const signIn = createAsyncThunk('auth/signIn', async (formData: SignInForm) => {
  try {
    const response = await axiosInstance.post('/user/sign-in', formData, {
      withCredentials: true
    });
    console.log("🔍 SIGN IN RESPONSE:", response.data);
    console.log(" ➡️ SIGN IN RESPONSE:", response.data.data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Sign in failed',
      status: error.response?.status
    };
  }
}
);

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
    });

    return response.data;

  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed"
    };
  }
}

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/user/profile', {
      withCredentials: true,
    });

    return response.data;

  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to get user profile"
    };
  }
}

export const filterUser = async (
  filter: {
    searchQuery?: string,
    page?: number,
    limit?: number
  }
) => {
  try {
    const queryParmas = new URLSearchParams();
    if (filter.searchQuery) queryParmas.append('searchQuery', filter.searchQuery)
    if (filter.page) queryParmas.append('page', filter.page.toString())
    if (filter.limit) queryParmas.append('limit', filter.limit.toString())

    const response = await axiosInstance.get(`/user/filter-user?${queryParmas.toString()}`, {
      withCredentials: true,
    });

    return response.data;

  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to filter user"
    };
  }
}
