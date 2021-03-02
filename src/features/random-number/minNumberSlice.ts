import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface MinNumberState {
    value: number
}

const initialState: MinNumberState = {
    value: 1
}

export const minNumberSlice = createSlice({
    name: 'minNumber',
    initialState,
    reducers: {
        setMinNumber: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    }
});

export const { setMinNumber } = minNumberSlice.actions;

export const selectMin = (state: RootState) => state.minNumber.value;

export default minNumberSlice.reducer;