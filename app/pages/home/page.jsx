"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Posts from "../../components/posts/Posts";
import CreatePost from "../../components/posts/CreatePost";
import { getPosts } from "../../api/posts/getPosts";
import { getLikes } from "../../api/posts/likes"
import { setLikes } from "../../../store/slice";

export default function Home() {
  const router = useRouter();
  const currentUser = useSelector((state) => state.store.user);
  const dispatch = useDispatch();
  const [dataPosts, setDataPosts] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      return router.push("/pages/login");
    }
  }, [currentUser]);

  //=> Obtengo los posts y los likes del usuario
  useEffect(() => {
    fetchPosts();
    getLikes(currentUser?.id).then((res) => {
      //console.log(res);
      dispatch(setLikes(res))
    })
  }, []);
  
  const fetchPosts = async () => {
    getPosts().then((res) => {
      setDataPosts(res);
    });
  };

  const handleNewPost = async () => {
    await fetchPosts();
  };

  return (
    <div
      className="
      flex flex-col 
      text-white 
      items-center 
      m-4"
    >
      <div
        className="
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
