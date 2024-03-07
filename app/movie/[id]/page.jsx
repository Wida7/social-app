"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ContentDetails from "../../components/contentDetails/ContentDetails";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const currentUser = useSelector((state) => state.store.user);
  const movie = useSelector((state) =>
    state.store?.movies?.find((item) => item.id === params.id)
  );

  useEffect(() => {
    if (currentUser === null) {
      return router.push("/login");
    }
  }, [currentUser]);

  return <ContentDetails movie={movie} />;
}
