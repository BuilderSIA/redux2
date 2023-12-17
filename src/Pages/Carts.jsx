import { useSelector } from "react-redux";
import Cart from "./Cart";


function Carts() {

    const {items} = useSelector((state)=>state.cart)
    return (
        <div className="cart-box">
            {items.map((item)=><Cart key={item.id} {...item} />)}
        </div>
    );
}

export default Carts;