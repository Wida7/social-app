import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { MdOutlinePostAdd, MdAddPhotoAlternate } from "react-icons/md";
import { addPost } from "../../api/posts/createPost";
import toast from "react-hot-toast";

export default function CreatePost({ handleNewPost }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentUser = useSelector((state) => state.store.user);
  const [image64, setImage64] = useState("");
  //=> form hook
  const { register, handleSubmit } = useForm();

  //=> Función para validar el inicio de sesión y setear las peliculas a Redux
  const onSubmit = (values) => {
    console.log(values.description);

    const dataPost = {
      description: values.description,
      image64: image64,
      likes: 0,
      userId: currentUser.id,
    };

    addPost(dataPost)
      .then((res) => {
        console.log(res);
        setImage64("");
        toast.success("Publicación creada con exito");
        handleNewPost();
      })
      .catch((e) => {
        console.log(e);
        toast.error(`Error en la creación de la publicación`);
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage64(reader.result); // reader.result es la imagen en base64
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div
        className="
        rounded
        border-slate-900
        flex flex-col
        w-[97%]
        my-2"
      >
        <Button className=" self-start" onPress={onOpen} color="primary">
          <MdOutlinePostAdd size={20} /> Crea una nueva publicación!
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crea tu publicación
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Textarea
                    isRequired
                    {...register("description")}
                    autoFocus
                    label="Descripción"
                    placeholder="Ingresa el texto de la publicación"
                    variant="bordered"
                  />
                  <p className="flex items-center mt-6">
                    <MdAddPhotoAlternate size={18} /> Selecciona una imagen
                    (opcional)
                  </p>
                  <input
                    {...register("image")}
                    className="mb-2"
                    type="file"
                    name="image"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" onPress={onClose} type="submit">
                    Publicar
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
