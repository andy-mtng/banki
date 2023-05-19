import "../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">Banki</Link>
            {/* Change this to "Open App" if the user is already logged in */}
            <Link to="/login">Login</Link>
        </nav>
    );
}

export default Navbar;