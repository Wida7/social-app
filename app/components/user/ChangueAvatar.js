import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { changueAvatar } from "../../api/user/avatarUser";
import { useDispatch } from "react-redux";
import { MdAddPhotoAlternate } from "react-icons/md";
import { imageToBase64 } from "../../utils/imageToBase64";
import { setNewAvatar } from "../../../store/slice";
import toast from "react-hot-toast";

export default function ChangueAvatar({ isOpen, onOpenChange, idUser }) {
  const [image64, setImage64] = useState("");
  //=> form hook
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();


  const onSubmit = (values) => {
    //console.log(values.image);
    const dataPost = {
      image64: image64,
      uid: idUser,
    };

    changueAvatar(dataPost)
      .then((res) => {
        dispatch(setNewAvatar(image64));
        //console.log(res);
        toast.success("Cambio de foto realizado");
        setImage64("");
      })
      .catch((e) => {
        console.log(e);
        toast.error(`Error en la creación de la publicación`);
      });
  };

  //=> Función para convertir la imagen en base64
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    try {
      const imageBase64 = await imageToBase64(file);
      setImage64(imageBase64);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Cambia tu foto de perfil
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <p className="flex items-center mt-6">
                  <MdAddPhotoAlternate className="mr-2" size={18} /> Selecciona
                  una imagen
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
                  Cambiar
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
