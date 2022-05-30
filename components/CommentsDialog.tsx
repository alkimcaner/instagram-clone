import React, { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import Comment from "./Comment";

interface StateProps {
  isCommentsVisible: boolean;
  setCommentsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Comments = ({ isCommentsVisible, setCommentsVisible }: StateProps) => {
  return (
    <Transition appear show={isCommentsVisible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={() => setCommentsVisible(false)}
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

        <div className="fixed inset-0 overflow-hidden">
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
              <Dialog.Panel className="w-full max-w-2xl flex flex-col gap-4 transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-4 border-b"
                >
                  Comments
                </Dialog.Title>
                <div className="flex flex-col flex-1 gap-4">
                  {/* Image */}
                  <div className="relative h-[16rem] w-full">
                    <Image
                      src="data:image/jpeg;base64,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"
                      alt=""
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  {/* Comments */}
                  <div className="h-[8rem] text-left overflow-y-scroll flex flex-col gap-4">
                    <Comment />
                    <Comment />
                    <Comment />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Comments;
