import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface IUploadModalProps {
  isUploadVisible: boolean;
  setUploadVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadModal = ({
  isUploadVisible,
  setUploadVisible,
}: IUploadModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]);
    console.log(event.target.files?.[0]);
  };

  return (
    <Transition appear show={isUploadVisible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
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

                <form
                  className="mt-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setUploadVisible(false);
                  }}
                >
                  {/* File Input */}
                  <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    required
                  />
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
                      required
                    />
                  </div>

                  {/* Post */}
                  <div>
                    <input
                      type="submit"
                      className="mx-auto mt-2 flex justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none transition cursor-pointer"
                      value="Post"
                    />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UploadModal;
