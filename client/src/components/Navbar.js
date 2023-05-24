import "../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">Banki</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
        </nav>
    );
}

export default Navbar;