import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    accessToken: string | null;
    userRole: string | null;
    userId: string | null;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    userRole: localStorage.getItem('userRole'),
    userId: localStorage.getItem('userId'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string; userRole: string; userId: string }>) => {
            const { accessToken, userRole, userId } = action.payload;
            console.log('access',accessToken);
            state.accessToken = accessToken;
            state.userRole = userRole;
            state.userId = userId;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('userId', userId);
        },
        logOut: (state) => {
            state.accessToken = null;
            state.userRole = null;
            state.userId = null;

            localStorage.removeItem('accessToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userId');
        }
    }
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
