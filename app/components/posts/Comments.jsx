import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TfiCommentAlt } from "react-icons/tfi";
import { BiMessageAdd } from "react-icons/bi";
import SkeletonLoading from "../skeleton/Skeleton";
import { formatDate } from "../../utils/formatDate";
import { useForm } from "react-hook-form";
import { addComment } from "../../api/posts/comments";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Avatar,
  Progress,
} from "@nextui-org/react";

export default function Comments({ comments, idPost, handleNewPost }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentUser = useSelector((state) => state.store.user);
  const { register, handleSubmit, reset } = useForm();
  const [loadingComment, setLoadingComment] = useState(false);

  const onSubmit = (values) => {
    //console.log(values.comment);
    const dataPost = {
      comment: values.comment,
      user: currentUser.name,
      avatar: currentUser.avatar,
      idUser: currentUser.id,
    };
    setLoadingComment(true);
    addComment(idPost, dataPost)
      .then(() => {
        reset();
        handleNewPost();
        setLoadingComment(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingComment(false);
      });
  };
  //console.log(comments);

  return (
    <>
      <Button className="group" onPress={onOpen} color="primary" variant="light">
        Comentarios <TfiCommentAlt className="group-hover:animate-bounce" size={18} />
      </Button>
      <p
        className="w-[120px] ml-2 text-primary text-[15px] hover:cursor-pointer"
        onClick={onOpen}
      >
        {comments?.length || 0} Comentarios
      </p>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="3xl"
        className="bg-default-50/95"
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Comentarios
              </ModalHeader>
              <ModalBody>
                {comments ? (
                  comments.map((comment, id) => {
                    return (
                      <Card key={id} className="bg-default-100/70 hover:bg-slate-950">
                        <CardHeader className="flex gap-3">
                          <Avatar src={comment.avatar} />
                          <div className="flex flex-col">
                            <p className="text-md">{comment.user}</p>
                            <p className="text-small text-default-500">
                              {formatDate(comment.date)}
                            </p>
                          </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                          <p>{comment.comment}</p>
                        </CardBody>
                      </Card>
                    );
                  })
                ) : (
                  <>
                    {comments?.length ? (
                      <SkeletonLoading />
                    ) : (
                      <p className="m-8 flex justify-center">
                        No hay comentarios, se el primero en comentar!
                        <BiMessageAdd className="ml-4" size={22} />
                      </p>
                    )}
                  </>
                )}
              </ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalFooter className="flex items-center">
                  {loadingComment ? (
                    <Progress
                      size="md"
                      isIndeterminate
                      aria-label="Loading..."
                      className="px-12"
                    />
                  ) : (
                    <Input
                      {...register("comment")}
                      autoFocus
                      isRequired
                      label="Comentario"
                      placeholder="Escribe tu comentario aquí"
                      variant="bordered"
                    />
                  )}

                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" variant="flat" type="submit">
                    Comentar
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
