// import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import BankiLogo from "../assets/banki-logo.png";

function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()
  
    const handleClick = () => {
      logout();
    }

    return (
        <nav className="bg-blue-900 flex justify-between px-16 py-6 text-white">
            <div>
                <Link to={user ? "/categories" : "/"} className="text-xl flex gap-3 font-bold">
                    <div className="bg-blue-200 w-7 h-7 rounded-md"></div>
                    Banki
                </Link>
            </div>          
            <div>
                {user && <button onClick={handleClick}>Logout</button>}
                {!user &&
                <div className="flex gap-5">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign up</Link>
                </div>}
            </div>
        </nav>
    );
}

export default Navbar;