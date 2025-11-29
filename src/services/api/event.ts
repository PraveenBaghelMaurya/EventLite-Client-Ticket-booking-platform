import axiosInstance from './axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse } from '../types/apiResponse';
import type { Event } from '../types/event';

export const createEvent = async (formData: Event): Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.post('/event/create-event', formData);
        return response.data;
    } catch (error: any) {
        return error.response?.data || {
            success: false,
            message: 'Failed to create event'
        };
    }
}

export const filterEvents = createAsyncThunk(
    'events/filterEvents',
    async (filters: {
        searchQuery?: string;
        categoryType?: string;
        timeRange?: string;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: string;
    }, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams();

            if (filters.searchQuery) queryParams.append('searchQuery', filters.searchQuery);
            if (filters.categoryType) queryParams.append('categoryType', filters.categoryType);
            if (filters.timeRange) queryParams.append('timeRange', filters.timeRange);
            if (filters.page) queryParams.append('page', filters.page.toString());
            if (filters.limit) queryParams.append('limit', filters.limit.toString());
            if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
            if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder);

            const response = await axiosInstance.get(`/event/filter-event?${queryParams.toString()}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message || "Failed to fetch events",
                status: error.response?.status
            });
        }
    }
);


export const getEventById = async (id: number): Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.get(`/event/get-event/${id}`);
        return response.data;
    } catch (error: any) {
        return error.response?.data || {
            success: false,
            message: 'Failed to fetch event'
        };
    }
}

export const updateEvent = async (formData: Event, id: number): Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.put(`/event/update-event/${id}`, formData);
        return response.data;
    } catch (error: any) {
        return error.response?.data || {
            success: false,
            message: 'Failed to update event'
        };
    }
};

export const deleteEvent = async (id: number): Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.delete(`/event/delete-event/${id}`); // ✅ Added leading slash
        return response.data;
    } catch (error: any) {
        return error.response?.data || {
            success: false,
            message: 'Failed to delete event'
        };
    }
};