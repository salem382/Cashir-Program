import {configureStore} from '@reduxjs/toolkit';
import products from './productsSlice';
import pill from './pillSlice'
const store = configureStore({
    reducer: {
        products,
        pill
    }
})

export default store;