/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useDispatch} from "react-redux";
import { dec, inc, removeItem } from "../features/cartslice";

function Cart({ id,title, price, img, amount }) {
    const dispatch = useDispatch()

    return (
        <div className="cart-item">
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