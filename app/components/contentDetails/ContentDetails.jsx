import React from "react";
import YouTube from "react-youtube";

export default function ContentDetails({ movie }) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="flex flex-col sm:grid grid-cols-3 grid-rows-1 gap-2 mt-6 mx-8">
      <div className="flex flex-col items-center">
        <img
          src={movie?.image}
          alt={movie?.title}
          className="w-64 rounded-lg"
        />
      </div>
      <div className="col-span-2">
        <h2 className="text-3xl mb-4 mt-4 sm:mt-0 font-semibold">
          {movie?.title} ({movie?.year})
        </h2>
        <p>{movie?.description}</p>
        {movie?.idTrailer ? (
          <YouTube videoId={movie?.idTrailer} opts={opts} className="flex" />
        ) : (
          <p className="text-xl mt-8 font-semibold">
            No contamos con el trailer aún :(
          </p>
        )}
      </div>
    </div>
  );
}
