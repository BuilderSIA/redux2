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







# redux-t
# Redux Toolkit


```


```

#### Existing App

```sh
npm install @reduxjs/toolkit react-redux
```

#### @reduxjs/toolkit

consists of few libraries

- redux (core library, state management)
- immer (allows to mutate state)
- redux-thunk (handles async actions)
- reselect (simplifies reducer functions)

#### Extras

- redux devtools
- combine reducers

#### react-redux

connects our app to redux

#### Setup Store

- create store.js

```js
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});
```

#### Setup Provider

- index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import store and provider
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

#### Setup Cart Slice

- application feature
- create features folder/cart
- create cartSlice.js

```js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
});

console.log(cartSlice);

export default cartSlice.reducer;
```

- store.js

```js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
```

#### Redux DevTools

- extension

#### Access store value

- create components/Navbar.js

```js
import { CartIcon } from '../icons';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { amount } = useSelector((state) => state.cart);

  return (
    <nav>
      <div className='nav-center'>
        <h3>redux toolkit</h3>
        <div className='nav-container'>
          <CartIcon />
          <div className='amount-container'>
            <p className='total-amount'>{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
```

#### Hero Icons

- [Hero Icons](https://heroicons.com/)

```css
nav svg {
  width: 40px;
  color: var(--clr-white);
}
```

#### Setup Cart

- cartSlice.js

```js
import cartItems from '../../cartItems';

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
};
```

- create CartContainer.js and CartItem.js
- CartContainer.js

```js
import React from 'react';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((state) => state.cart);

  if (amount < 1) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button className='btn clear-btn'>clear cart</button>
      </footer>
    </section>
  );
};

export default CartContainer;
```

- CartItem.js

```js
import React from 'react';
import { ChevronDown, ChevronUp } from '../icons';

const CartItem = ({ id, img, title, price, amount }) => {
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        {/* remove button */}
        <button className='remove-btn'>remove</button>
      </div>
      <div>
        {/* increase amount */}
        <button className='amount-btn'>
          <ChevronUp />
        </button>
        {/* amount */}
        <p className='amount'>{amount}</p>
        {/* decrease amount */}
        <button className='amount-btn'>
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
```

#### First Reducer

- cartSlice.js
- Immer library

```js
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { clearCart } = cartSlice.actions;
```

- create action

```js
const ACTION_TYPE = 'ACTION_TYPE';

const actionCreator = (payload) => {
  return { type: ACTION_TYPE, payload: payload };
};
```

- CartContainer.js

```js
import React from 'react';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';

const CartContainer = () => {
  const dispatch = useDispatch();

  return (
    <button
      className='btn clear-btn'
      onClick={() => {
        dispatch(clearCart());
      }}
    >
      clear cart
    </button>
  );
};

export default CartContainer;
```

#### Remove, Increase, Decrease

- cartSlice.js

```js
import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
```

- CartItem.js

```js
import React from 'react';
import { ChevronDown, ChevronUp } from '../icons';

import { useDispatch } from 'react-redux';
import { removeItem, increase, decrease } from '../features/cart/cartSlice';

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();

  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        {/* remove button */}
        <button
          className='remove-btn'
          onClick={() => {
            dispatch(removeItem(id));
          }}
        >
          remove
        </button>
      </div>
      <div>
        {/* increase amount */}
        <button
          className='amount-btn'
          onClick={() => {
            dispatch(increase({ id }));
          }}
        >
          <ChevronUp />
        </button>
        {/* amount */}
        <p className='amount'>{amount}</p>
        {/* decrease amount */}
        <button
          className='amount-btn'
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease({ id }));
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
```

- App.js

```js
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import { useSelector, useDispatch } from 'react-redux';
import { calculateTotals } from './features/cart/cartSlice';

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
```

#### Modal

- create components/Modal.js

```js
const Modal = () => {
  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h4>Remove all items from your shopping cart?</h4>
        <div className='btn-container'>
          <button type='button' className='btn confirm-btn'>
            confirm
          </button>
          <button type='button' className='btn clear-btn'>
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Modal;
```

- App.js

```js
return (
  <main>
    <Modal />
    <Navbar />
    <CartContainer />
  </main>
);
```

#### modal slice

- create features/modal/modalSlice.js

```js
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
```

- App.js

```js
const { isOpen } = useSelector((state) => state.modal);

return (
  <main>
    {isOpen && <Modal />}
    <Navbar />
    <CartContainer />
  </main>
);
```

#### toggle modal

- CartContainer.js

```js
import { openModal } from '../features/modal/modalSlice';

return (
  <button
    className='btn clear-btn'
    onClick={() => {
      dispatch(openModal());
    }}
  >
    clear cart
  </button>
);
```

- Modal.js

```js
import { closeModal } from '../features/modal/modalSlice';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';

const Modal = () => {
  const dispatch = useDispatch();

  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h4>Remove all items from your shopping cart?</h4>
        <div className='btn-container'>
          <button
            type='button'
            className='btn confirm-btn'
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
          >
            confirm
          </button>
          <button
            type='button'
            className='btn clear-btn'
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Modal;
```

#### async functionality with createAsyncThunk

- [Course API](https://course-api.com/)
- https://course-api.com/react-useReducer-cart-project
- cartSlice.js

- action type
- callback function
- lifecycle actions

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(error));
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
```

- App.js

```js
import { calculateTotals, getCartItems } from './features/cart/cartSlice';

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
```

#### Options

```sh
npm install axios
```

- cartSlice.js

```js
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);
```

#### The extraReducers "builder callback" notation

cart/cartSlice

```js
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});
```

  
