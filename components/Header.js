import React from "react";
import Link from "next/link";

const Header = ({ onAddClick }) => {
  return (
    <header className="bg-white p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cooking History</h1>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-8 hidden">
            <li>
              <Link href="/" className="hover:underline p-2">
                Home
              </Link>
            </li>
            <li>
              <Link href="/calendar" className="hover:underline p-2">
                Calendar
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline p-2">
                About
              </Link>
            </li>
          </ul>
          <button
            onClick={onAddClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Cooking Entry
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
