'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export default function Home() {

  const router = useRouter()  

  const currentUser = useSelector(state => state.store.user)

  useEffect(() => {
    if (currentUser != null) {
      return router.push('/pages/home')
    }  else {
      return router.push('/pages/login')
    }
  }, [currentUser])
  
  
  return (
    <></>
  );
}
