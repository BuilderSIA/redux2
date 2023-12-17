import { configureStore } from "@reduxjs/toolkit";
import cartslice from "./features/cartslice";




export const store = configureStore({
    reducer:{
      cart:cartslice
    }
  })