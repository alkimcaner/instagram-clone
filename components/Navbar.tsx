import React, { useState, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
//Icons
import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsPlusCircle, BsHouseDoor } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import UploadModal from "./UploadModal";

const Navbar = () => {
  const [isUploadVisible, setUploadVisible] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="flex justify-between items-center px-6 max-w-5xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <div className="flex-1 cursor-pointer mt-4">
            <Image src="/instagram.svg" alt="" width={103} height={36} />
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 text-center hidden sm:block">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-100 rounded-md px-2 h-9 w-full outline-none"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 ml-8 flex justify-end items-center gap-5 text-2xl">
          <Link href="/">
            <div>
              <BsHouseDoor className="cursor-pointer" />
            </div>
          </Link>
          {session && (
            <>
              <button onClick={() => setUploadVisible(true)}>
                <div>
                  <BsPlusCircle />
                </div>
              </button>
              <Link href="/">
                <div>
                  <FaRegHeart className="cursor-pointer" />
                </div>
              </Link>
            </>
          )}

          {/* Account Menu */}
          <Menu
            as="div"
            className="relative inline-flex flex-col items-center text-left z-10"
          >
            <Menu.Button>
              {session ? (
                <div className="relative w-7 h-7 rounded-full overflow-hidden select-none">
                  <Image
                    src={session?.user?.image || ""}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ) : (
                <CgProfile />
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute right-0 mt-8 w-48 overflow-hidden text-base origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {session ? (
                  <>
                    <Menu.Item>
                      <button className="p-2 cursor-pointer hover:bg-gray-50 w-full text-left flex items-center gap-2">
                        <CgProfile /> Profile
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        onClick={() => signOut()}
                        className="p-2 cursor-pointer hover:bg-gray-50 w-full text-left flex items-center gap-2"
                      >
                        <MdLogout /> Sign Out
                      </div>
                    </Menu.Item>
                  </>
                ) : (
                  <Menu.Item>
                    <button
                      onClick={() => signIn()}
                      className="p-2 cursor-pointer hover:bg-gray-50 w-full text-left flex items-center gap-2"
                    >
                      <CgProfile /> Sign In
                    </button>
                  </Menu.Item>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        </nav>
        {/* Upload Modal */}
        <UploadModal
          isUploadVisible={isUploadVisible}
          setUploadVisible={setUploadVisible}
        />
      </div>
    </header>
  );
};

export default Navbar;
