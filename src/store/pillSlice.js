import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    pill : {
        pillItems: [],
        total : 0,
        shift : localStorage.getItem('shift') ? Number(localStorage.getItem('shift')) : 0
    }
}

const pillSlice = createSlice({
    name:'pill',
    initialState,
    reducers : {
        addItem : (state, action) => {
            let i = state.pill.pillItems.findIndex(item => item.name === action.payload.name);
            if (i === -1) {
                state.pill.pillItems.push({...action.payload,count:1});
            } else {
                let x = {...state.pill.pillItems[i]};
                x.count +=1;
                state.pill.pillItems[i] = {...x};
            }
        },
        updateCount : (state, action) => {
            console.log ('updated')
            let i = state.pill.pillItems.findIndex(item => item.name === action.payload[0]);  
            state.pill.pillItems[i].count =  action.payload[1];
            
        },
        getTotal : (state) => {
            let x = state.pill.pillItems.reduce((prev, curr) => {
                let i = curr.count * curr.price;
                prev += i;  
                return prev;              
            },0)
           state.pill.total = x;
        },
        deleteItem : (state, action) => {
            state.pill.pillItems.splice(action.payload, 1);
        },
        discount: (state, action) => {
            if (action.payload[0] === 'percent') {
               let onePercent =  state.pill.total / 100;
               let discount = onePercent * action.payload[1];
               state.pill.total = state.pill.total - discount;
            } else {
                state.pill.total = state.pill.total -  action.payload[1];
            }
        },
        deleteAll : (state) => {
            state.pill.pillItems = [];
        },
        addToShift : (state) => {
            state.pill.shift += state.pill.total;
            localStorage.setItem('shift',state.pill.shift);
            state.pill.total = 0;
        },
        resetShift : (state) => {
            state.pill.shift = 0;
            localStorage.setItem('shift',state.pill.shift);
        },
        deleteTotal : (state) => {
            state.pill.total = 0;   
        }
    }
})

export default pillSlice.reducer;

export const {addItem, updateCount, getTotal, deleteItem, discount, deleteAll, addToShift, resetShift, deleteTotal} = pillSlice.actions;
