"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
  useDisclosure,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const route = useRouter();

  const menuItems = ["Log Out"];

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

        <NavbarContent className="sm:flex gap-4" justify="end">
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
          <NavbarItem className="hidden sm:flex">
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
        <NavbarContent className="sm:hidden" justify="end">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
        <NavbarMenu className="bg-slate-900/80 items-end">
          <NavbarMenuItem className="mt-4">
            {currentUser ? (
              <div className="flex gap-4 items-center">
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
          </NavbarMenuItem>
          <NavbarMenuItem className="mt-4">
            {currentUser != null ? (
              <Button
                as={Link}
                onClick={() => {
                  dispatch(reset()), logOut(currentUser?.id, userlikes), setIsMenuOpen(false)
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
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>

      <ChangueAvatar
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        idUser={currentUser?.id}
      />
    </>
  );
}
