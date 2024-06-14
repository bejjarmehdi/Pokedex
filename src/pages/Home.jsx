import React from "react";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "./components/Layout";

const Home = () => {
  const router = useRouter();

  const handleSearch = (searchTerm) => {
    router.push(`/Recherche?q=${searchTerm}`);
  };

  return (
    <Layout>
     <div className=" text-amber-500 mt-[-75px] ml-[360px]  ">
      <h1>Bienvenue sur le Pokédex !</h1>
      </div>
    <div className="container mx-auto">
      <nav>
        <SearchBar onSearch={handleSearch} />
      </nav>
      <br></br>
      <br></br>
      <div className="grid grid-cols-3 gap-4"> {/* Utilisation de la classe grid pour créer une grille de 3 colonnes */}
          <div><Card pokemon="pikachu" /></div>
          <div><Card pokemon="bulbasaur" /></div>
          <div><Card pokemon="ivysaur" /></div>
          <div><Card pokemon="venusaur" /></div>
          <div><Card pokemon="charmander" /></div>
          <div><Card pokemon="charmeleon" /></div>
          <div><Card pokemon="charizard" /></div>
          <div><Card pokemon="squirtle" /></div>
          <div><Card pokemon="wartortle" /></div>
        </div>
    </div>
    </Layout>
  );
};

export default Home;
