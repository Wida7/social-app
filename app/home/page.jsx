"use client";

import React, { useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { GiEarthAsiaOceania, GiImpLaugh, GiPistolGun } from "react-icons/gi";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { MdOutlineApps } from "react-icons/md";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ContentCategory from "../components/contentCategory/ContentCategory";

export default function Home() {
  const router = useRouter();
  const currentUser = useSelector((state) => state.store.user);

  useEffect(() => {
    if (currentUser != null) {
      return router.push("/home");
    } else {
      return router.push("/login");
    }
  }, [currentUser]);

  const movies = useSelector((state) => state.store.movies);

  const tabs = [
    {
      id: 1,
      label: "Todas",
      icon: <MdOutlineApps />,
    },
    {
      id: 2,
      label: "Aventura",
      icon: <GiEarthAsiaOceania />,
    },
    {
      id: 3,
      label: "Acción",
      icon: <GiPistolGun />,
    },
    {
      id: 4,
      label: "Comedia",
      icon: <FaRegFaceLaughSquint />,
    },
    {
      id: 5,
      label: "Terror",
      icon: <GiImpLaugh />,
    },
  ];

  return (
    <div className="flex flex-col text-white items-center m-4 ">
      <Tabs
        className="w-full justify-center"
        aria-label="Dynamic tabs"
        items={tabs}
        size="lg"
      >
        {(item) => (
          <Tab
            key={item.id}
            title={
              <div className="flex items-center space-x-1 ">
                {item.icon}
                <span>{item.label}</span>
              </div>
            }
          >
            <ContentCategory movies={movies} idCategory={item.id} />
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
