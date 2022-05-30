import React, { useState, Fragment, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, Menu, Transition } from "@headlessui/react";
//Icons
import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsPlusSquare } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const [isUploadVisible, setUploadVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <header className="border-b sticky top-0 bg-white z-10">
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
            <AiOutlineHome className="cursor-pointer" />
          </Link>
          <button onClick={() => setUploadVisible(true)}>
            <BsPlusSquare />
          </button>
          <Link href="/">
            <FaRegHeart className="cursor-pointer" />
          </Link>
          {/* Account Settings */}
          <Menu
            as="div"
            className="relative inline-flex flex-col items-center text-left z-10"
          >
            <Menu.Button>
              <CgProfile />
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
                <Menu.Item>
                  <button className="p-2 cursor-pointer hover:bg-gray-50 w-full text-left flex items-center gap-2">
                    <CgProfile /> Profile
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <div className="p-2 cursor-pointer hover:bg-gray-50 w-full text-left flex items-center gap-2">
                    <MdLogout /> Logout
                  </div>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </nav>

        {/* Upload Dialog */}
        <Transition appear show={isUploadVisible} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setUploadVisible(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 pb-4 border-b"
                    >
                      Create new post
                    </Dialog.Title>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Upload photo</p>
                    </div>

                    {/* File Input */}
                    <div className="mt-2">
                      <input type="file" hidden ref={fileInputRef} />
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Select from computer
                      </button>

                      {/* Caption */}
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Write a caption..."
                          className="block mx-auto mt-2 text-center outline-none rounded-sm p-1 focus-visible:ring-2 focus-visible:ring-blue-200"
                        />
                      </div>

                      <div>
                        <button
                          type="button"
                          className="mx-auto mt-2 flex justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none transition"
                          onClick={() => setUploadVisible(false)}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </header>
  );
};

export default Navbar;
