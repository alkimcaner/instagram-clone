import React from "react";
import Image from "next/image";

const Comment = () => {
  return (
    <div>
      {/* Profile photo */}
      <div className="flex items-center gap-2">
        <div className="rounded-full overflow-hidden relative w-8 h-8">
          <Image
            src="data:image/jpeg;base64,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"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className="font-semibold text-sm">flawn</h1>
      </div>

      <p className="break-all text-sm mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quis
        harum officiis atque distinctio earum laboriosam doloremque iste
        recusandae iure! Minima nobis quam hic quibusdam error, quasi doloremque
        libero rerum.
      </p>
      <p className=" font-light text-xs">2 minutes ago</p>
    </div>
  );
};

export default Comment;
