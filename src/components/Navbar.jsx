import { useSelector } from "react-redux";

function Navbar() {
    const {amount} = useSelector((state)=>state.cart);
    
    return (
        <div className="nav">
            <ul className="nav-list">
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>{amount}</li>
            </ul>
        </div>
    );
}

export default Navbar;