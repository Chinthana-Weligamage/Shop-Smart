import React from "react";
import NavLinks from "../../reference/NavLinks";

const Navbar = () => {
  return (
    <nav className="bg-secondary text-primary-content max-h-9 h-9 flex items-center justify-center">
      <ul className="w-full inline-flex gap-7 cursor-pointer justify-center">
        {NavLinks.map((link) => (
          <li key={link.title}>
            <a href={link.url} className="hover:text-primary">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
