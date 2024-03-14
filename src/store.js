import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice.js';
import inputSliceReducer from './slices/inputSlice.js'
import chargeSliceReducer from './slices/chargeSlice.js'
import resultSliceReducer from './slices/resultSlice.js';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        inputs: inputSliceReducer,
        chargeAmount: chargeSliceReducer,
        result: resultSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;