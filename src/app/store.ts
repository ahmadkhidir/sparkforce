import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import modalSlice from '../components/modal/modalSlice';
import authSlice from '../authentication/slice';

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    auth: authSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
