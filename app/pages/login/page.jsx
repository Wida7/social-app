"use client";

import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Container from "../../components/Container";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLike } from "../../../store/slice";
import { logInService, logInServiceGoogle } from "../../api/login/logIn"
import { FcGoogle } from "react-icons/fc";



export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.store.user);
  //=> form hook
  const { register, handleSubmit } = useForm();

  //=> Validación del campo email
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (currentUser) {
      return router.push("/pages/home");
    }
  }, [currentUser]);


  const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);


  //=> Función para validar el inicio de sesión y setear las peliculas a Redux
  const onSubmit = (values) => {
    //console.log(values.email, values.password);

      logInService(values.email, values.password).then((res) => {
        //console.log(res);
        toast.success(`Bienvenido ${res.name}`);
        dispatch(setUser(res));
        router.push("/pages/home");
      }).catch((e) => {
        console.log(e)
        toast.error(`Correo o contraseña invalidos`);
      });
  };

  const signInGoogle = () => {
      logInServiceGoogle().then((res) => {
        //console.log(res);
        toast.success(`Bienvenido ${res.name}`);
        dispatch(setUser(res));
        router.push("/pages/home");
      }).catch((e) => {
        console.log(e)
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
          label="Contraseña"
          defaultValue=""
          variant="bordered"
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
          Ingresar
        </Button>
        <Button
          color="primary"
          variant="bordered"
          className={`w-1/2 hover:bg-white ${
            isInvalid ? "cursor-not-allowed" : ""
          }`}
          onClick={() => signInGoogle()}
        >
          <FcGoogle />Ingresar con Google
        </Button>        
        <Button
          color="primary"
          variant="light"
          className=""
          onClick={() => router.push('/pages/register')}
        >
          Registrarse
        </Button>
      </form>
    </Container>
  );
}
