import React from "react";
import Post from "./Post";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { PostType } from "../pages";

const Feed = ({ posts }: { posts: PostType[] }) => {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen pt-8 bg-slate-50 flex justify-center gap-8">
      <section className="w-[28rem]">
        {posts?.map((post) => (
          <Post key={Math.random()} post={post} />
        ))}
      </section>
      <section className="w-[20rem] h-fit hidden lg:flex items-center">
        {session && (
          <div className="flex items-center gap-2 fixed top-24">
            <div className="rounded-full overflow-hidden relative w-12 h-12">
              <Image
                src={session?.user?.image || ""}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h1 className="font-semibold">flawn</h1>
          </div>
        )}
      </section>
    </main>
  );
};

export default Feed;
