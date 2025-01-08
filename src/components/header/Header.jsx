import React from "react";
import { Logo, LogoutBtn, Container } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStaus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: authStaus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStaus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStaus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStaus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStaus,
    },
  ];
  return (
    <header className="py-3 shadow bg-black ">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Logo />
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) => {
              item.active ? (
                <li key={item.name}>
                  <button
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null;
            })}
            {authStaus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
