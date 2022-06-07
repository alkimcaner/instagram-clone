import React, { Fragment } from "react";
import Image from "next/image";
import TimeAgo from "react-timeago";
import { IPost } from "../pages";
import { Menu, Transition } from "@headlessui/react";
import { RiMoreFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";

const Comment = ({
  comment,
  dispatch,
}: {
  comment: IPost["comments"][number];
  dispatch: React.Dispatch<any>;
}) => {
  const { data: session } = useSession();

  return (
    <div>
      {/* Profile photo */}
      <div className="flex items-center gap-2 mt-2">
        <div className="rounded-full overflow-hidden relative w-8 h-8">
          {comment.userPhoto && (
            <Image
              src={comment.userPhoto}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
        <h1 className="font-semibold text-sm">{comment.name}</h1>
        {/* More */}
        {session && session?.user?.email === comment.email && (
          <div className="ml-auto cursor-pointer text-xl z-10">
            <Menu
              as="div"
              className="relative inline-flex flex-col items-center text-left"
            >
              <Menu.Button>
                <RiMoreFill />
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
                    <div
                      onClick={() =>
                        dispatch({
                          type: "DELETE_COMMENT",
                          payload: comment.id,
                        })
                      }
                      className="p-2 cursor-pointer hover:bg-gray-50 w-full text-left text-red-600 flex items-center gap-2"
                    >
                      <FaTrash /> Delete comment
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </div>

      <p className="break-all text-sm mt-2">{comment.comment}</p>
      <p className="font-light text-xs">
        <TimeAgo date={comment.createdAt?.seconds * 1000 || Date.now()} />
      </p>
    </div>
  );
};

export default Comment;
