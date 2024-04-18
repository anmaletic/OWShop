import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/owshop_logo.png";

const NavBar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-dark fixed-top"
        data-bs-theme="dark"
      >
        <div className="container-xxl">
          <Link
            className="navbar-brand navbar-ext"
            to="/"
            onClick={() => setActiveLink("/")}
          >
            <div
              data-bs-toggle="collapse"
              data-bs-target=".navbar-collapse.show"
            >
              <img src={logo} alt="OWShop" height="34" />
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto">
              <Link
                className={`nav-link ${activeLink === "/" && "active"}`}
                to="/"
                onClick={() => setActiveLink("/")}
              >
                <div
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  Home
                </div>
              </Link>
              <Link
                className={`nav-link ${activeLink === "/products" && "active"}`}
                to="/products"
                onClick={() => setActiveLink("/products")}
              >
                <div
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  Products
                </div>
              </Link>
              <Link
                className={`nav-link ${activeLink === "/contact" && "active"}`}
                to="/contact"
                onClick={() => setActiveLink("/contact")}
              >
                <div
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  Contact
                </div>
              </Link>
            </div>
            <div className="navbar-nav ms-auto">
              <Link
                className={`nav-link ${activeLink === "/cart" && "active"}`}
                to="/cart"
                onClick={() => setActiveLink("/cart")}
              >
                <div
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  Cart
                </div>
              </Link>
              <Link
                className={`nav-link ${activeLink === "/login" && "active"}`}
                to="/login"
                onClick={() => setActiveLink("/login")}
              >
                <div
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  Login
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
