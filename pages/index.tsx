import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  const [selectedMovie, setSelectedMovie] = useState<Record<string, any> | null>(movies[0] || null);

  const handleSelectMovie = (movie: Record<string, any>) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard movie={selectedMovie} />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} onSelectMovie={handleSelectMovie} />
        <MovieList title="My List" data={favorites} onSelectMovie={handleSelectMovie} />
      </div>
    </>
  );
}
