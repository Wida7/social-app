import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLike } from "../../../store/slice";
import { Avatar, Button, Divider } from "@nextui-org/react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";
import SkeletonLoading from "../skeleton/Skeleton";
import Comments from "../../components/posts/Comments";
import { formatDate } from "../../utils/formatDate";
import { addLike } from "../../api/posts/likes";
import { useRouter } from "next/navigation";


export default function Posts({ dataPosts, setDataPosts, handleNewPost }) {
  const route = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.store.user);
  const userlikes = useSelector((state) => state.store.userlikes);
  const [likesLoading, setLikesLoading] = useState({});

  //=> Función para agregar/quitar likes
  const handleLike = async (postId, like, idCurrentUser, setDataPosts) => {
    setLikesLoading((prev) => ({ ...prev, [postId]: true }));

    //console.log(postId, like, idCurrentUser, setDataPosts);
    await addLike(postId, like, idCurrentUser, setDataPosts)
      .then((res) => {
        dispatch(setLike(res));
      })
      .finally(() => {
        setLikesLoading((prev) => ({ ...prev, [postId]: false }));
      });
  };

  //console.log(dataPosts);

  return (
    <>
      {dataPosts != [] ? (
        dataPosts?.map((post, id) => {
          return (
            <div
              className="
              rounded
              border
              border-slate-900
              my-2
              p-2
              hover:bg-slate-950"
              key={id}
            >
              <div className="flex items-center justify-between" key={id}>
                <div className="flex items-center hover:cursor-pointer" onClick={() => {route.push(`/pages/profile/${post.userId}`) }}>
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
              <div className="pl-4 mb-4">
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
                  className="group"
                  color="danger"
                  variant="light"
                  disabled={likesLoading[post.id]}
                  onClick={() =>
                    handleLike(
                      post.id,
                      userlikes[post.id] ? false : true,
                      currentUser.id,
                      setDataPosts
                    )
                  }
                >
                  {userlikes[post.id] ? (
                    <>
                      Dislike{" "}
                      <FaHeartBroken
                        className="group-hover:animate-bounce"
                        size={18}
                      />
                    </>
                  ) : (
                    <>
                      Like{" "}
                      <FaHeart
                        className="group-hover:animate-bounce"
                        size={18}
                      />
                    </>
                  )}
                </Button>
                <div className="w-[80px] ml-1 text-center">
                  {likesLoading[post.id] ? (
                    <Spinner color="danger" labelColor="danger" size="sm" />
                  ) : (
                    <p className=" text-danger text-[15px]">
                      {post.likes} Likes
                    </p>
                  )}
                </div>
                <Comments
                  comments={post.comments}
                  idPost={post.id}
                  handleNewPost={handleNewPost}
                />
              </div>
            </div>
          );
        })
      ) : (
        /* Esqueleto de carga mientras realiza el fetchd e los datos */
        <SkeletonLoading w_px="800px" />
      )}
    </>
  );
}
