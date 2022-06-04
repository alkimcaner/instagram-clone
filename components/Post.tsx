import React, { Fragment, useState } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import TimeAgo from "react-timeago";
import CommentsModal from "./CommentsModal";
import { PostType } from "../pages";
//Icons
import {
  FaRegHeart,
  FaRegComment,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa";
import { RiMoreFill } from "react-icons/ri";
import { useSession } from "next-auth/react";

const Post = ({ post }: { post: PostType }) => {
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="bg-white border rounded-md mb-4">
      <div className="p-4 flex items-center gap-4">
        {/* Profile photo */}
        <div className="rounded-full overflow-hidden relative w-8 h-8">
          <Image src={post.userPhoto} alt="" layout="fill" objectFit="cover" />
        </div>
        {/* Username */}
        <p className="font-medium">{post.name}</p>
        {/* More */}
        {session && session?.user?.email === post.email && (
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
                    <div className="p-2 cursor-pointer hover:bg-gray-50 w-full text-left text-red-600 flex items-center gap-2">
                      <FaTrash /> Delete post
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </div>
      {/* Image */}
      <div className="relative h-[32rem]">
        <Image src={post.image} alt="" layout="fill" objectFit="cover" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        {/* Action buttons */}
        <div className="flex items-center gap-6 text-xl mb-2">
          <FaRegHeart className="cursor-pointer" />
          <FaRegComment
            className="cursor-pointer"
            onClick={() => setCommentsVisible(true)}
          />
          <FaPaperPlane className="cursor-pointer" />
        </div>
        {/* Description */}
        <div className="text-sm">
          <span className="font-semibold">{post.name}</span>{" "}
          <span className="">{post.caption}</span>
        </div>
        <button onClick={() => setCommentsVisible(true)}>
          <div className="text-sm text-left font-light text-gray-500 cursor-pointer">
            View all comments
          </div>
        </button>
        <div className="text-xs text-gray-500 font-thin">
          <TimeAgo date={post.createdAt?.seconds * 1000 || Date.now()} />
        </div>
      </div>
      {/* Comments */}
      <CommentsModal
        isCommentsVisible={isCommentsVisible}
        setCommentsVisible={setCommentsVisible}
        post={post}
      />
    </div>
  );
};

export default Post;
