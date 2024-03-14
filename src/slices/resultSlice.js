import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    result : JSON.parse(localStorage.getItem('result')) || []
}

const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        setResult: (state, action) => {
            state.result = action.payload;
            localStorage.setItem('result', JSON.stringify(action.payload))
        }
    }
})

export const { setResult } = resultSlice.actions;

export default resultSlice.reducer