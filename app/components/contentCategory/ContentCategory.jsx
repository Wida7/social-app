import React from "react";
import CardMovie from "../cardMovie/CardMovie";
import { useRouter } from "next/navigation";

export default function ContentCategory({ movies, idCategory }) {
  const route = useRouter();

  return (
    <div
      className="
      mx-8 grid place-items-center 
      grid-cols-1 
      sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {idCategory === 1
        ? movies?.map((movie) => (
            <div
              className="w-64"
              onClick={() => route.push(`/movie/${movie.id}`)}
            >
              <CardMovie
                title={movie.title}
                year={movie.year}
                image={movie.image}
              />
            </div>
          ))
        : movies
            ?.filter((movie) => movie.idCategory === idCategory)
            .map((movie) => (
              <div
                className="w-64"
                onClick={() => route.push(`/movie/${movie.id}`)}
              >
                <CardMovie
                  title={movie.title}
                  year={movie.year}
                  image={movie.image}
                />
              </div>
            ))}
    </div>
  );
}
