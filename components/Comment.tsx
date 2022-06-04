import React from "react";
import Image from "next/image";
import TimeAgo from "react-timeago";
import { PostType } from "../pages";

const Comment = ({ comment }: { comment: PostType["comments"][number] }) => {
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
      </div>

      <p className="break-all text-sm mt-2">{comment.comment}</p>
      <p className="font-light text-xs">
        <TimeAgo date={comment.createdAt?.seconds * 1000 || Date.now()} />
      </p>
    </div>
  );
};

export default Comment;
