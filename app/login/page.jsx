"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Container from "../components/Container";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setMovies, setUser } from "../../store/slice";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  //=> form hook
  const { register, handleSubmit } = useForm();

  //=> Validación del campo email
  const [email, setEmail] = React.useState("");
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isInvalid = React.useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  //=> Función para validar el inicio de sesión y setear las peliculas a Redux
  const onSubmit = (values) => {
    axios
      .post("/api/login", values)
      .then((res) => {
        if (res.data.Response === "No existe") {
          return toast.error("No existe usuario");
        }

        try {
          axios.get("/api/movies").then((response) => {
            dispatch(setMovies(response.data));
          });
        } catch (error) {
          console.log(error);
        }

        dispatch(setUser(res.data));
        toast.success(`Bienvenido ${res.data.name}`);
        router.push("/home");
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Error en el servidor");
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
          Iniciar sesión
        </Button>
      </form>
    </Container>
  );
}
