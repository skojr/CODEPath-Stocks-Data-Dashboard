import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <div className="home-link" key="home-button">
            <Link style={{ color: "white" }} to="/">
              Home
            </Link>
          </div>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
