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
            {user ? (
            <Link to="/categories">Banki</Link>
            ) : (
            <Link to="/">Banki</Link>
            )}            
            {user && <button onClick={handleClick}>Logout</button>}
            {!user &&
            <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
            </div>}
        </nav>
    );
}

export default Navbar;