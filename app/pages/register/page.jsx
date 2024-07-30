"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Container from "../../components/Container";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { registerService } from "../../api/register/register";
import { logInServiceGoogle } from "../../api/login/logIn";
import { FcGoogle } from "react-icons/fc";
import { setUser } from "../../../store/slice";
import { validateEmail } from "../../utils/validateEmail";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();

  //=> form hook
  const { register, handleSubmit } = useForm();

  //=> Validación del campo email
  const [email, setEmail] = useState("");

  const isInvalid = React.useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  //=> Función para validar el inicio de sesión por email/password
  const onSubmit = (values) => {
    console.log(values.email, values.password, values.name);
    registerService(values.email, values.password, values.name)
      .then(() => {
        router.push("/pages/home");
      })
      .catch((e) => {
        toast.error(e.code)
        console.log(e)
      });
  };

  //=> Función para validar el inicio de sesión por cuenta de Google
  const signInGoogle = () => {
    logInServiceGoogle()
      .then((res) => {
        console.log(res);
        toast.success(`Bienvenido ${res.name}`);
        dispatch(setUser(res));
        router.push("/pages/home");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-1/2 items-center mt-12 max-w-[400px]"
      >
        <Input
          {...register("email")}
          isRequired
          value={email}
          type="email"
          label="Email"
          variant="bordered"
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : "default"}
          errorMessage={isInvalid && "Ingrese un correo valido"}
          onValueChange={setEmail}
          className="max-w-xs"
        />
        <Input
          {...register("password")}
          isRequired
          type="password"
          minLength={6}
          label="Contraseña"
          defaultValue=""
          variant="bordered"
          className="max-w-xs"
        />
        <Input
          {...register("name")}
          isRequired
          type="text"
          maxLength={25}
          label="Nombre de usuario"
          variant="bordered"
          color="default"
          className="max-w-xs"
        />
        <Button
          color="primary"
          variant="bordered"
          type="submit"
          className={`w-1/2 hover:bg-white ${
            isInvalid ? "cursor-not-allowed" : ""
          }`}
        >
          Crear usuario
        </Button>
        <Button
          color="primary"
          variant="bordered"
          className={`hover:bg-white ${isInvalid ? "cursor-not-allowed" : ""}`}
          onClick={() => signInGoogle()}
        >
          <FcGoogle /> Registrarse con Google
        </Button>
        <Button
          color="primary"
          variant="light"
          className=""
          onClick={() => router.push("/pages/login")}
        >
          Iniciar sesión
        </Button>
      </form>
    </Container>
  );
}
