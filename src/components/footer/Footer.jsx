import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <div>
      <div className="w-full bg-black text-primary-50 p-8 md:p-16 shadow-lg text-white">
        {" "}
        <footer className="flex flex-col gap-8 md:gap-16">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <Logo />
            <nav>
              <ul className="flex flex-wrap gap-4 md:gap-8 text-base md:text-lg text-white">
                <li>
                  <a href="#home" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#categories" className="hover:underline">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
                Contact Info
              </h3>
              <p className="text-sm md:text-base mb-2 md:mb-3">
                Email: contact@blogspace.com
              </p>
              <p className="text-sm md:text-base mb-2 md:mb-3">
                Phone: +987654321
              </p>
              <p className="text-sm md:text-base">
                Address: 456 Blog Avenue, BloggerCity
              </p>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
                Quick Links
              </h3>
              <ul className="text-sm md:text-base flex flex-col gap-2 md:gap-3">
                <li>
                  <a href="#about" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:underline">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
                Follow Us
              </h3>
              <div className="flex gap-4 md:gap-6 text-[#611BF8]">
                <i className="fa-brands fa-facebook text-primary-50 text-2xl md:text-3xl cursor-pointer"></i>
                <i className="fa-brands fa-twitter text-primary-50 text-2xl md:text-3xl cursor-pointer"></i>
                <i className="fa-brands fa-instagram text-primary-50 text-2xl md:text-3xl cursor-pointer"></i>
                <i className="fa-brands fa-linkedin text-primary-50 text-2xl md:text-3xl cursor-pointer"></i>
              </div>
            </div>
          </div>
          <div className="text-center mt-4 md:mt-8 border-t border-neutral-700 pt-4 md:pt-8">
            <p className="text-xs md:text-sm">
              &copy; 2023 BlogSpace. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
