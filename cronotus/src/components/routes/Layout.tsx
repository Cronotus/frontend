import { Link, Outlet } from "react-router-dom";
import "../../styles/routing.css";

const Layout = () => {
  return (
    <div>
      <nav className="route-layout">
        <Link to="/" className="layout-link layout-children">
          <div>
            <h1>Home</h1>
          </div>
        </Link>
        <Link to="/browser" className="layout-link layout-children">
          <div>
            <h1>Browser</h1>
          </div>
        </Link>
        <Link to="/profile" className="layout-link layout-children">
          <div>
            <h1>Profile</h1>
          </div>
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
