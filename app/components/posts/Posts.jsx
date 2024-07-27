import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLike } from "../../../store/slice";
import { Avatar, Button, Divider } from "@nextui-org/react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import Image from "next/image";
import { Spinner, Skeleton } from "@nextui-org/react";
import { doc, getFirestore, getDoc, updateDoc } from "firebase/firestore";
import firebaseApp from "../../firebase/credenciales";
const firestore = getFirestore(firebaseApp);

export default function Posts({ dataPosts, setDataPosts }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.store.user);
  const userlikes = useSelector((state) => state.store.userlikes);
  const [likesLoading, setLikesLoading] = useState({});

  const handleLike = async (postId, like) => {
    setLikesLoading((prev) => ({ ...prev, [postId]: true }));

    try {
      const postRef = doc(firestore, "posts", postId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists) {
        //=> aumento o disminuyo el like del usuario
        const newLikes = postSnapshot.data().likes + (like ? 1 : -1);

        //=> Actualiza los likes del post
        const existingUserlikes = postSnapshot.data().userslike || {};
        //console.log("POST", postSnapshot.data());
        //console.log("ANTERIORES", existingUserlikes);
        const updatedUserlikes = {
          ...existingUserlikes,
          [currentUser.id]: like,
        };
        //console.log("ACTUALIZADOS", updatedUserlikes);

        await updateDoc(postRef, {
          likes: newLikes,
          userslike: updatedUserlikes,
        });
        dispatch(setLike({ postId, liked: like }));

        //=> Actualiza el estado local para reflejar el cambio inmediatamente
        setDataPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: newLikes } : post
          )
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLikesLoading((prev) => ({ ...prev, [postId]: false }));
      //console.log(userlikes);
    }
  };

  const formatDate = (timestamp) => {
    const date = timestamp?.toDate();
    return date?.toLocaleString();
  };

  return (
    <>
      {dataPosts ? (
        dataPosts.map((post, id) => {
          return (
            <div
              className="
              rounded
              border
              border-slate-900
              flex flex-col
              w-[97%]
              my-2
              p-2
              hover:bg-slate-950"
              key={id}
            >
              <div className="flex items-center justify-between" key={id}>
                <div className="flex items-center">
                  <Avatar src={post.avatar} />
                  <p className="ml-4 self-left">{post.name}</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-4 text-slate-400">{formatDate(post.date)}</p>
                </div>
              </div>
              <div className="my-4 pl-4">
                <p>{post.description}</p>
              </div>
              <div className="pl-4">
                {post.image64 ? (
                  <Image
                    src={post.image64}
                    className="w-64 rounded"
                    width={600}
                    height={600}
                    alt="desc"
                  />
                ) : (
                  <></>
                )}
              </div>
              <Divider />
              <div className="mt-2 flex items-center">
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => handleLike(post.id, (userlikes[post.id] ? false : true))}
                >
                  {userlikes[post.id] ? (
                    <>
                      Dislike <FaHeartBroken />
                    </>
                  ) : (
                    <>
                      Like <FaHeart />
                    </>
                  )}
                </Button>
                <div className="w-[80px] ml-2 text-center">
                {likesLoading[post.id] ? (
                  <Spinner color="danger" labelColor="danger" size="sm" />
                ) : (
                  <p className=" text-danger">{post.likes} Likes</p>
                )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="max-w-[800px] w-full flex items-center gap-3 my-8">
          <div>
            <Skeleton className="flex rounded-full w-16 h-16" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-4 w-3/5 rounded-lg" />
            <Skeleton className="h-4 w-4/5 rounded-lg" />
            <Skeleton className="h-4 w-5/5 rounded-lg" />
          </div>
        </div>
      )}
    </>
  );
}
