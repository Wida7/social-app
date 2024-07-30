"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
  useDisclosure,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../../store/slice";
import { Caveat } from "next/font/google";
import { logOut } from "../../api/logout/logOut";
import { useRouter } from "next/navigation";
import ChangueAvatar from "../../components/user/ChangueAvatar";

//=> Fuente
const caveat = Caveat({ subsets: ["latin"], weight: ["400"] });

export default function Nav() {
  const currentUser = useSelector((state) => state.store.user);
  const userlikes = useSelector((state) => state.store.userlikes);
  const dispatch = useDispatch();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const route = useRouter();

  return (
    <>
      <Navbar className=" bg-transparent mb-4">
        <NavbarBrand>
          <Link href="/">
            <p
              className={`${caveat.className} font-bold text-inherit text-4xl text-white hover:text-[#006FEE] hover:scale-125 duration-500 cursor-pointer`}
            >
              Social App
            </p>
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          {currentUser ? (
            <div className="flex gap-4 collapse md:visible items-center">
              <Avatar
                isBordered
                radius="lg"
                className="hover:cursor-pointer"
                src={currentUser.avatar}
                onClick={onOpen}
              />
              <p
                className="mr-2 hover:cursor-pointer"
                onClick={() => {
                  route.push(`/pages/profile/${currentUser.id}`);
                }}
              >
                {currentUser.name}
              </p>
            </div>
          ) : (
            <></>
          )}
          <NavbarItem>
            {currentUser != null ? (
              <Button
                as={Link}
                onClick={() => {
                  dispatch(reset()), logOut(currentUser?.id, userlikes);
                }}
                color="primary"
                variant="bordered"
                className="hover:bg-white hover:text-black hover:border-white"
              >
                CERRAR SESIÓN
              </Button>
            ) : (
              <></>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <ChangueAvatar
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        idUser={currentUser?.id}
      />
    </>
  );
}
