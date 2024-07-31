"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Posts from "../../components/posts/Posts";
import CreatePost from "../../components/posts/CreatePost";
import { getPosts } from "../../api/posts/getPosts";
import { getLikes } from "../../api/posts/likes";
import { setLikes } from "../../../store/slice";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonLoading from "../../components/skeleton/Skeleton";
import { BsEmojiFrown } from "react-icons/bs";

export default function Home() {
  const router = useRouter();
  const currentUser = useSelector((state) => state.store.user);
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  const [dataPosts, setDataPosts] = useState([]);
  //=> Estados para controlar la carga de posts dependiendo scroll del usuario
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  //=> Valido si hay un usuario activo
  useEffect(() => {
    if (!currentUser) {
      return router.push("/pages/login");
    }
  }, [currentUser]);

  //=> UseEffect especifico para cuando el usuario cambie de foto de perfil, actualizar los posts del ususario
  useEffect(() => {
    if (hasFetched.current) {
      loadMorePosts(true);
    }
  }, [currentUser?.avatar]);

  //=> funcionalidad para cargar por partes los post y no todos de golpe
  const loadMorePosts = async (newPost = null) => {
    //=> Valido si se creo un nuevo post, para cargar de nuevo los 10 primeros
    let lastVisibleRef = lastVisible;
    if (newPost) {
      lastVisibleRef = null;
    }

    const {
      data: newPosts,
      newLastVisible,
      hasMore: morePosts,
    } = await getPosts(lastVisibleRef);

    setDataPosts((prev) => {
      if (newPost) {
        return newPosts;
      } else {
        return [...prev, ...newPosts];
      }
    });
    setLastVisible(newLastVisible);
    setHasMore(morePosts);
  };

  //=> Evitar doble fetch en entorno de desarollo
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      loadMorePosts();
    }
    getLikes(currentUser?.id).then((res) => {
      //console.log(res);
      dispatch(setLikes(res));
    });
  }, []);

  //=> función para actualizar los posts cuando se crea uno en el componenten <CreatePost />
  const handleNewPost = async () => {
    await loadMorePosts(true);
  };

  return (
    <div
      className="
      flex flex-col 
      text-white 
      items-center 
      m-4
      "
    >
      <div
        className="
        flex flex-col items-center 
        max-w-[900px] 
        w-[100%] 
        rounded
        border-[1px]
        border-slate-800
        bg-gradient-to-b from-black to-slate-900"
      >
        <CreatePost handleNewPost={handleNewPost} />
        <InfiniteScroll
          dataLength={dataPosts?.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={<SkeletonLoading w_px="800px" />}
          endMessage={
            <p className="my-10 text-center flex w-full justify-center">
              No hay más posts <BsEmojiFrown className="mx-2" size={20} /> por
              el momento!
            </p>
          }
          style={{ width: "auto" }}
        >
          <Posts
            dataPosts={dataPosts}
            setDataPosts={setDataPosts}
            handleNewPost={handleNewPost}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
}
