import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import minReducer from '../features/random-number/minNumberSlice';
import maxReducer from '../features/random-number/maxNumberSlice';

export const store = configureStore({
  reducer: {
    minNumber: minReducer,
    maxNumber: maxReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
