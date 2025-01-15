import React, { useState } from "react";
import { Logo, LogoutBtn, Container } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  // State to control the sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: authStatus },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  // Toggle the sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle navigation and close the sidebar
  const handleNavigation = (slug) => {
    navigate(slug);
    setIsSidebarOpen(false); // Close sidebar on navigation
  };

  return (
    <header className="py-3 shadow bg-black sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="mr-4">
            <Logo />
          </div>

          {/* Hamburger Icon for small screens */}
          <div className="lg:hidden">
            <button
              onClick={toggleSidebar}
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Items (desktop view) */}
          <ul className="hidden lg:flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-white"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>

      {/* Sidebar for small screens */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black w-[70%] z-50">
          {/* Sidebar content */}
          <div className="flex justify-end p-4">
            <button onClick={toggleSidebar} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-center items-center h-full w-auto bg-black">
            <ul className="text-center  text-white space-y-4">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        className="px-6 py-2  duration-200 hover:bg-blue-100 rounded-full"
                        onClick={() => handleNavigation(item.slug)} // Close sidebar after click
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
