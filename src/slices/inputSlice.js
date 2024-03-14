import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fileName : localStorage.getItem('fileName') || null,
    api: JSON.parse(localStorage.getItem('api')) || [],
    statusCode: JSON.parse(localStorage.getItem('statusCode')) || []
}

const inputSlice = createSlice({
    name: 'inputs',
    initialState,
    reducers: {
        setFileName: (state, action) => {
            state.fileName = action.payload;
            localStorage.setItem('fileName', action.payload); // storing only the file name
        },
        apiUrl: (state, action) => {
            state.api = action.payload;
            localStorage.setItem('api', JSON.stringify(action.payload))
        },
        statusCodes: (state, action) => {
            state.statusCode = action.payload;
            localStorage.setItem('statusCode', JSON.stringify(action.payload))
        }
    }
})

export const { setFileName, apiUrl, statusCodes } = inputSlice.actions

export default inputSlice.reducer