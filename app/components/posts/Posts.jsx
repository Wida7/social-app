import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@nextui-org/react";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";
import { doc, getFirestore, getDoc, updateDoc } from "firebase/firestore";
import firebaseApp from "../../firebase/credenciales";
const firestore = getFirestore(firebaseApp);

export default function Posts({ dataPosts, setDataPosts }) {
  const [likesLoading, setLikesLoading] = useState({});

  const handleLike = async (postId) => {
    setLikesLoading((prev) => ({ ...prev, [postId]: true }));

    try {
      const postRef = doc(firestore, "posts", postId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists) {
        const newLikes = postSnapshot.data().likes + 1;
        await updateDoc(postRef, { likes: newLikes });

        // Actualiza el estado local para reflejar el cambio inmediatamente
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
              <div className="mt-2">
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => handleLike(post.id)}
                >
                  Like <FaHeart />
                  {likesLoading[post.id] ? (
                    <Spinner color="danger" labelColor="danger" size="sm" />
                  ) : (
                    post.likes
                  )}
                </Button>
              </div>
            </div>
          );
        })
      ) 
      : <Spinner label="Cargando" color="primary" labelColor="primary" />
      }
    </>
  );
}
