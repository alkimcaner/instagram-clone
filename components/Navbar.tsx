import React from "react";
//Icons
import { FaRegHeart, FaRegCompass } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsPlusSquare } from "react-icons/bs";
import { RiMessengerLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="flex justify-between items-center px-6 max-w-5xl mx-auto">
        <Link href="/asd">
          <div className="flex-1 cursor-pointer mt-4">
            <Image src="/instagram.svg" alt="" width={103} height={36} />
          </div>
        </Link>

        <div className="flex-1 text-center hidden sm:block">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-100 rounded-md px-2 h-9 w-full outline-none"
          />
        </div>

        <div className="flex-1 text-right ml-8 flex gap-5 text-2xl">
          <Link href="/">
            <AiOutlineHome className="cursor-pointer" />
          </Link>
          <Link href="/">
            <RiMessengerLine className="cursor-pointer" />
          </Link>
          <Link href="/">
            <BsPlusSquare className="cursor-pointer" />
          </Link>
          <Link href="/">
            <FaRegCompass className="cursor-pointer" />
          </Link>
          <Link href="/">
            <FaRegHeart className="cursor-pointer" />
          </Link>
          <Link href="/">
            <CgProfile className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
