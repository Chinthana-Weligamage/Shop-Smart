import React from "react";
import NavLinks from "../../reference/NavLinks";

const Navbar = () => {
  return (
    <nav className="bg-secondary text-primary-content max-h-10 h-10 flex items-center justify-center">
      <ul className="w-full inline-flex gap-7 cursor-pointer justify-center text-white font-semibold">
        {NavLinks.map((link) => (
          <li key={link.title}>
            <a href={link.url} className="hover:text-accent">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
