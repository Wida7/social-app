"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Posts from "../../components/posts/Posts";
import CreatePost from "../../components/posts/CreatePost";
import { getPosts } from "../../api/posts/getPosts";

export default function Home() {
  const router = useRouter();
  const currentUser = useSelector((state) => state.store.user);

  const [dataPosts, setDataPosts] = useState(null);

  useEffect(() => {
    if (currentUser != null) {
      return router.push("/pages/home");
    } else {
      return router.push("/pages/login");
    }
  }, [currentUser]);

  useEffect(() => {
    fetchPosts()
  }, []);

  const fetchPosts = async () => {
    getPosts().then((res) => {
      setDataPosts(res)
    })
  };

  const handleNewPost = async () => {
    await fetchPosts();
  };

  return (
    <div className="
      flex flex-col 
      text-white 
      items-center 
      m-4"
    >
      <div className="
        flex flex-col items-center 
        max-w-[900px] 
        w-[100%] 
        rounded
        border-[1px]
        border-slate-800
         hove:bg-slate-950"
      >
        <CreatePost handleNewPost={handleNewPost} />
        <Posts dataPosts={dataPosts} setDataPosts={setDataPosts} />
        
      </div>
    </div>
  );
}
