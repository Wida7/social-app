"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../../api/user/getUserInfo";
import SkeletonLoading from "../../../components/skeleton/Skeleton";
import { Card, Skeleton } from "@nextui-org/react";
import { Avatar, useDisclosure } from "@nextui-org/react";
import ChangueAvatar from "../../../components/user/ChangueAvatar";
import { useSelector } from "react-redux";

export default function Page() {
  const params = useParams();
  const currentUser = useSelector((state) => state.store.user);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //=> useEffect para cargar los datos del usuario por medio del parametro, simulo un retraso para ver el Skeleton
  useEffect(() => {
    setLoading(true);
    const fetchUserInfo = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      getUserInfo(params.id)
        .then((res) => {
          setUserInfo(res);
          //console.log(res);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchUserInfo();
  }, [currentUser]);

  return (
    <>
      <div
        className="
      flex flex-col 
      text-white 
      items-center 
      m-4"
      >
        <div
          className="
        flex flex-col items-center 
        max-w-[900px] 
        w-[100%] 
        rounded
        border-[1px]
        border-slate-800
        hover:bg-slate-950
        bg-gradient-to-b from-black to-blue-900"
        >
          {loading ? (
            <SkeletonLoading maxW={800} />
          ) : (
            <>
              <div className="flex flex-col items-center gap-2 mt-8 mx-8 max-w-[900px] w-full pb-12">
                <div className="flex items-center">
                  <Avatar
                    src={userInfo?.avatar}
                    className="w-36 h-36 hover:cursor-pointer hover:opacity-60"
                    onClick={onOpen}
                  />
                </div>
                <div>
                  <h2 className="text-3xl my-8 sm:mt-0 font-semibold text-center">
                    {userInfo?.name}
                  </h2>
                </div>

                <div className="grid grid-flow-row sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <Card className="w-[300px] space-y-5 p-4" radius="lg">
                      <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                      </Skeleton>
                      <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                      </div>
                    </Card>
                  </div>
                  <div>
                    <SkeletonLoading />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <ChangueAvatar
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        idUser={currentUser.id}
      />
    </>
  );
}
