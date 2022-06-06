import React, { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";
import Comment from "./Comment";
import { IPost } from "../pages";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

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
  const commentRef = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState<IPost["comments"]>([]);

  const handleComment = async (event: FormEvent) => {
    event.preventDefault();
    if (commentRef.current?.value === "") return;

    const comment: IPost["comments"][number] = {
      comment: commentRef.current?.value || "",
      createdAt: Timestamp.now(),
      name: session?.user?.name || "",
      userPhoto: session?.user?.image || "",
    };

    setComments(() => [...post.comments, comment]);

    if (!post.id) return;
    await updateDoc(doc(db, "posts", post.id), {
      comments: [...post.comments, comment],
    });
  };

  useEffect(() => {
    setComments(post.comments);
  }, []);

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
                    <form className="flex gap-2" onSubmit={handleComment}>
                      <input
                        type="text"
                        placeholder="Write a comment"
                        className="p-2 outline-none ring-1 rounded-md w-full"
                        ref={commentRef}
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
                    {comments
                      .sort((a, b) =>
                        a.createdAt.seconds < b.createdAt.seconds ? 1 : -1
                      )
                      .map((comment) => (
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
