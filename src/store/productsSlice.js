import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    products : localStorage.getItem('productsItems') === null ? [] :
    JSON.parse(localStorage.getItem('productsItems'))
}

const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers : {
        addProduct : (state, action) => {
            state.products.push(action.payload);
            localStorage.setItem('productsItems',JSON.stringify(state.products));
        },
        updateProduct : (state, action) => {
            if (action.payload[0] !== undefined) {
                state.products[action.payload[0]] = {...action.payload[1]}
            }
            localStorage.setItem('productsItems',JSON.stringify(state.products));
        },
        handleNumbers : (state, action) => {
           
            state.products[action.payload[0]].numbers -=  action.payload[1];
            localStorage.setItem('productsItems',JSON.stringify(state.products));
        }
    }
});

export default productsSlice.reducer;
export const {addProduct, updateProduct, handleNumbers} = productsSlice.actions;