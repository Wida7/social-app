'use client'

import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../../store/slice";
import { Caveat } from "next/font/google"

const caveat = Caveat({subsets: ['latin'], weight: ['400']})

export default function Nav() {

  const currentUser = useSelector(state => state.store.user)
  const dispatch = useDispatch()

  return (
    <Navbar className=" bg-transparent mb-4">
      <NavbarBrand>
        <Link href="/">
          <p className={`${caveat.className } font-bold text-inherit text-3xl text-white hover:text-[#006FEE] hover:scale-125 duration-500 cursor-pointer`}>Movies App</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>

          {
            currentUser != null ?
              <Button as={Link} onClick={() => {dispatch(reset())}} color="primary" href="/login" variant="bordered" className="hover:bg-white hover:text-black hover:border-white">
                CERRAR SESIÓN
              </Button> :
              <Button as={Link} color="primary" href="/login" variant="bordered" className="hover:bg-white hover:text-black hover:border-white">
                INICIAR SESIÓN
              </Button> 
          }

        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}