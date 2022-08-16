import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    products : localStorage.getItem('productsItems') === null ? [] :
    JSON.parse(localStorage.getItem('productsItems')),
    deleted : false
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
           
            console.log (action.payload);
            action.payload.forEach(element => {
                let i = state.products.findIndex(item => item.name === element.name)
                if (state.products[i].numbers >= 1) {
                    state.products[i].numbers -= 1;
                    state.deleted = true;
                } else {
                    state.deleted = false;
                    alert(`numbers in ${state.products[i].name} doesn't allow`);
                }
            })
            localStorage.setItem('productsItems',JSON.stringify(state.products));
        }
    }
});

export default productsSlice.reducer;
export const {addProduct, updateProduct, handleNumbers} = productsSlice.actions;