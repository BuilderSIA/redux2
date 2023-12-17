# redux
Redux bizga state lar bilan ishlashda action lar hosil qilib bu actionlarni o'zimiz bilgan reducers bilan yanada clean roq code yozib tezroq boshqarish imkonini beradi.

// redux toolkitdan foydalanish uchun terminalga yozish kerak bo'lgan command lar

npm i reduxjs/toolkit

npm i react-redux

// data.js
agar data fetch qilinayotgan bo'lsa fetch function yozilib export qilinishi kerak. Agar data static bo'lsa data.js ochib olish va unga tashlab olinadi.

misol uchun

export default [

  
  {
  
  id: 1,
  
    title: 'Samsung Galaxy S7',
    
    price: 599.99,
    
    img: 'https://dl.airtable.com/.attachments/91ee456448cef47deec553a2ea3fa8ad/b08bec68/phone-2_ohtt5s.png',
    
    amount: 1,

    },
    
    {
    
    id: 2,
    
    title: 'google pixel ',
    
    price: 499.99,
    
    img: 'https://dl.airtable.com/.attachments/91c88ae8c1580e2b762ecb3f73ed1eed/a633139a/phone-1_gvesln.png',
    
    amount: 1,
  },
  
  {
  
    id: 3,
    
    title: 'Xiaomi Redmi Note 2',
    
    price: 699.99,
    
    img: 'https://dl.airtable.com/.attachments/bae9208dc34f35128749ecda5b999e84/337c285d/phone-3_h2s6fo.png',
    
    amount: 1,
    
  }
  
]

# action va reducers

// cartslice.jsx




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





  bu yerda initialState bizga state ga ma'lumotlarni jamlab berish uchun kerak.

  cartSlice orqali createSlice hook i reduxdan import qilib olingan.
  bu hook birqancha action va reducers dan foydalanib statedagi ma'lumotlarni harakatlantirishimizga yordam beradi.

  createSlice ichida object ochilganligi sabab reducers dagi har bir funksiyalarimiz nomi key orqali beriladi. funksiya value lari esa object value lariga scobe ichida odatdagidek yoziladi.



  export qilish biroz boshqacha cartSlicedagi actionlar alohida export qilinadi.
  reducer ham qo'shimchasiga umumiy export qilinadi.



# Store


// store.jsx


import { configureStore } from "@reduxjs/toolkit";

import cartslice from "./features/cartslice";





export const store = configureStore({

    reducer:{
    
      cart:cartslice
      
    }
    
  })
  






Store bizga state larni holatini boshqarish actionlarni qabul qilish va reducers ni chaqirib berish uchun ishlaydi.



# Mainda Redux Provider


// main.jsx



import React from 'react'

import ReactDOM from 'react-dom/client'

import App from './App.jsx'

import './index.css'

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'

import { store } from './store.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
  
    <BrowserRouter>
    
    <Provider store={store}>
    
    <App />
    
    </Provider>
    
    </BrowserRouter>
    
  </React.StrictMode>
  
)



State dan reducer va action lar yordamida boshqarilayotgan ma'lumotlar store dan elementlarga Provider componenti orqali yo'naltiriladi.
Bunda har doimgiday main.jsx da yozamiz biroq Provider comp iga element sifatida store ni saqlab qo'yamiz.

# Carts va Cart


// Carts.jsx


import { useSelector } from "react-redux";

import Cart from "./Cart";



function Carts() {


    const {items} = useSelector((state)=>state.cart)
    
    return (
    
        <div>
        
            {items.map((item)=><Cart key={item.id} {...item} />)}
            
        </div>
        
    );
    
}


export default Carts;



useSelector (bu useGlobalContextning redux varianti) orqali kerakli function larimizni yoki stateni chaqirib olish imkonimiz bor.
Cartsga itemni chaqirib destruction qilib uni Cartga jo'natamiz. Bunday qilishdan maqsad clean and beauty code va vaqtdan yutish.

// Cart.jsx



import { useDispatch, useSelector } from "react-redux";

import { dec, inc, removeItem } from "../features/cartslice";


function Cart({ id,title, price, img, amount }) {

    const dispatch = useDispatch()
    

    return (
    
        <div>

        <h2>{title}</h2>
        
          <img src={img} alt={title} />
          
          <h2>{price}</h2>
          
          <p>{amount}</p>
          
          <button onClick={(()=>dispatch(inc({id})))} >+</button>
          
          <button onClick={()=>{
          
            amount > 1 ? dispatch(dec({id})) : dispatch(removeItem(id))
            
          }}>-</button>
          
        </div>
        
    );
    
}


export default Cart;



Cart da esa destruction qilingan ma'lumotlarni qabul qilib foydalanishimiz mumkin.








  
