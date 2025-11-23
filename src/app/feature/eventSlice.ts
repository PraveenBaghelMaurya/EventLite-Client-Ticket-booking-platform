// features/eventsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { filterEvents } from '../../services/api/event';
import type { Pagination } from '../../services/types/apiResponse';
import type { ErrorPayload } from '../../services/types/apiResponse';

export const eventSlice = createSlice({
  name: 'eventSlice',
  initialState: {
    events: [],
    pagination: {} as Pagination,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(filterEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.data.events || action.payload.events || [];
        if (action.payload.data.pagination) {
          state.pagination = action.payload.data.pagination;
        }
        state.error = null;
      })
      .addCase(filterEvents.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as ErrorPayload | undefined;
        state.error = payload?.message || action.error?.message || 'Failed to fetch events';
      });
  },
});

export default eventSlice.reducer;