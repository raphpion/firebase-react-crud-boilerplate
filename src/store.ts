import { configureStore } from '@reduxjs/toolkit';
import userRecucer from './slices/user.slice';

export const store = configureStore({
  reducer: {
    user: userRecucer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
