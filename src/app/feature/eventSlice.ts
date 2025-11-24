// features/eventsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { filterEvents } from '../../services/api/event';
import type { Pagination } from '../../services/types/apiResponse';
import type { ErrorPayload } from '../../services/types/apiResponse';
import type { Event } from '../../services/types/event';

interface EventState {
  events: Event[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  pagination: null,
  loading: false,
  error: null,
};

export const eventSlice = createSlice({
  name: 'eventSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(filterEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterEvents.fulfilled, (state, action) => {
        state.loading = false;
        const events = action.payload?.data?.events || action.payload?.events || [];
        state.events = events as Event[];
        const pagination = action.payload?.data?.pagination || action.payload?.pagination || null;
        state.pagination = pagination;
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