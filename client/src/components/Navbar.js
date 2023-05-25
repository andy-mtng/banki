import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()
  
    const handleClick = () => {
      logout();
    }

    return (
        <nav className="navbar">
            <Link to="/">Banki</Link>
            <button onClick={handleClick}>Logout</button>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
        </nav>
    );
}

export default Navbar;