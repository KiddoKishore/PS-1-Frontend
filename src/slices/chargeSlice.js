import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    charge: JSON.parse(localStorage.getItem('charge')) || [],
    codes: JSON.parse(localStorage.getItem('codes')) || []
}

const chargeSlice = createSlice({
    name: 'chargeAmount',
    initialState,
    reducers: {
        setChargeAmount: (state, action) => {
            state.charge = action.payload;
            localStorage.setItem('charge', JSON.stringify(action.payload))
        },
        statuscode: (state, action) => {
            state.codes = action.payload;
            localStorage.setItem('codes', JSON.stringify(action.payload))
        }
    }
})

export const { setChargeAmount, statuscode } = chargeSlice.actions

export default chargeSlice.reducer