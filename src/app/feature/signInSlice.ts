import { createSlice } from '@reduxjs/toolkit';
import { signIn } from '../../services/api/user'
import type { ErrorPayload } from '../../services/types/apiResponse'
import type { User } from '../../services/types/user';

export const SignInSlice = createSlice({
    name: 'SignInSlice',
    initialState: {
        user: null as User | null,
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                console.log("✅ signIn.fulfilled payload:", action.payload);
                state.error = null;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;

                const payload = action.payload as ErrorPayload | undefined;
                state.error = payload?.message || action.error?.message || 'Something went wrong';
            });
    },
});

export default SignInSlice.reducer;