'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../../store/slice";
import { Caveat } from "next/font/google"
import { logOut } from "../../api/logout/logOut"

const caveat = Caveat({subsets: ['latin'], weight: ['400']})

export default function Nav() {

  const currentUser = useSelector(state => state.store.user)
  const dispatch = useDispatch()

  return (
    <Navbar className=" bg-transparent mb-4">
      <NavbarBrand>
        <Link href="/">
          <p className={`${caveat.className } font-bold text-inherit text-3xl text-white hover:text-[#006FEE] hover:scale-125 duration-500 cursor-pointer`}>
            Social App
          </p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {
          currentUser ? <>
            <Avatar isBordered radius="lg" className="" src={currentUser.avatar} />
            <p className="mr-2">{currentUser.name}</p></> 
          : <></>
        }
        <NavbarItem>
          {
            currentUser != null ?
              <Button as={Link} onClick={() => {dispatch(reset()), logOut()}} color="primary" href="/pages/login" variant="bordered" className="hover:bg-white hover:text-black hover:border-white">
                CERRAR SESIÓN
              </Button> :
              <>

              </> 
          }
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}