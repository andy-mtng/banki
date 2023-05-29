import Navbar from "./components/Navbar";

function NotFound() {
    return (
        <div className="bg-gray-100">
            <Navbar />
            <h1 className="mx-16 text-3xl mt-9">404 - Page Not Found</h1>
        </div>
    );
  }
  
export default NotFound;