import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";


interface MaxNumberState {
    value: number
}

const initialState = {
    value: 10
}

export const maxNumberSlice = createSlice({
    name: 'maxNumber',
    initialState,
    reducers: {
        setMaxNumber: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    }
});

export const { setMaxNumber } = maxNumberSlice.actions;

export const selectMax = (state: RootState) => state.maxNumber.value;

export default maxNumberSlice.reducer;