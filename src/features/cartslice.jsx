import { createSlice } from "@reduxjs/toolkit";
import data from "./data";




const initialState = {
    amount:0,
    items: data
  }
  
  const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
      clearCart :(state) => {
        state.items =[]
      },
      inc: (state, {payload}) => {
        const tmpItem = state.items.find((item) => item.id === payload.id);
        tmpItem.amount = tmpItem.amount + 1
      } ,
      dec: (state, {payload}) => {
        const tmpItem = state.items.find((item) => item.id === payload.id);
        tmpItem.amount = tmpItem.amount - 1
      } ,
      removeItem:(state,action)=>{
        state.items = state.items.filter((item)=> item.id !== action.payload )
      },
      total:(state)=>{
        let amount = 0
        let total = 0
        state.items.forEach((item)=>{
          amount += item.amount;
          total += item.amount * item.price;
        });
        state.amount = amount;
        state.total = total;
      }
    }
  })
  export const {clearCart,inc, dec,removeItem, total} = cartSlice.actions;
  
  export default cartSlice.reducer;