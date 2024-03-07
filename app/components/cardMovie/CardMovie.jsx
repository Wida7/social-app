import Image from "next/image";
import React from "react";

export default function CardMovie({ title, year, image }) {
  return (
    <div className="bg-trasparent rounded-lg shadow-2xl border border-slate-600 hover:bg-slate-900 cursor-pointer duration-500 hover:scale-105 mt-2 mb-6 mx-4">
      <Image src={image} alt={title} className="w-64 rounded-lg" width={600} height={600} />
      <div className="p-1 text-center w-full flex flex-col justify-center h-[90px]">
        <h2 className="font-bold text-sm mb-1 text-white w-full">{title}</h2>
        <p className="text-slate-500">{year}</p>
      </div>
    </div>
  );
}
