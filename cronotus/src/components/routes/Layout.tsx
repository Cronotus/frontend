import { Link, Outlet } from "react-router-dom";
import "../../styles/routing.css";

const Layout = () => {
  return (
    <div>
      <nav className="route-layout">
        <Link to="/">Home</Link>
        <Link to="/browser">Browser</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;
