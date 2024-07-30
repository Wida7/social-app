import { Avatar } from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";
import { BsEmojiSunglasses } from "react-icons/bs";

//=> Notificación personalizada libreria react-hot-toast
export default function Notification({ t, data }) {
  //console.log(t);
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-slate-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 pt-0.5">
            <Avatar src={data.avatar} />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">Bienvenid@ {data.name}</p>
            <p className="mt-1 text-sm text-gray-400 flex items-center">
              Disfruta de la mejor red social!
              <BsEmojiSunglasses className="ml-2" size={24} />
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Cerrar
      </button>
    </div>
    </div>
  );
}
