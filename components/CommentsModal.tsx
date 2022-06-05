import React, { Fragment } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";
import Comment from "./Comment";
import { IPost } from "../pages";

interface ICommentsModalProps {
  isCommentsVisible: boolean;
  setCommentsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  post: IPost;
}

const CommentsModal = ({
  isCommentsVisible,
  setCommentsVisible,
  post,
}: ICommentsModalProps) => {
  const { data: session } = useSession();

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
                <div className="flex flex-col flex-1 gap-2">
                  {/* Image */}
                  <div className="relative w-full aspect-video">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                      />
                    )}
                  </div>
                  {/* Write comment */}
                  {session && (
                    <form
                      className="flex gap-2"
                      onSubmit={(event) => event.preventDefault()}
                    >
                      <input
                        type="text"
                        placeholder="Write a comment"
                        className="p-2 outline-none ring-1 rounded-md w-full"
                        required
                      />
                      <input
                        type="submit"
                        value="Send"
                        className="text-blue-500 cursor-pointer"
                      />
                    </form>
                  )}

                  {/* Comments */}
                  <div className="max-h-[10rem] text-left overflow-y-scroll flex flex-col gap-4 divide-y">
                    {post.comments.map((comment) => (
                      <Comment key={Math.random()} comment={comment} />
                    ))}
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

export default CommentsModal;
