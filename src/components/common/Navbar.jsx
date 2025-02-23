import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-secondary text-primary-content max-h-9 h-9 flex items-center justify-center">
      <ul className="w-full inline-flex gap-7 cursor-pointer justify-center">
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
        <li>
          <a>Item 4</a>
        </li>
        <li>
          <a>Item 5</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
