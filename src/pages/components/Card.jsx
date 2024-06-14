// Importer React ainsi que les hooks useState et useEffect depuis la bibliothèque react
import React, { useState, useEffect } from 'react';
// Importer axios pour effectuer des requêtes HTTP
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// Définition du composant Card
const Card = ({ pokemon }) => {
  // Déclarer un state pour stocker les données du Pokémon récupérées depuis l'API
  const [pokemonData, setPokemonData] = useState(null);

  // Utiliser useEffect pour effectuer la récupération de données une fois que le composant est monté
  useEffect(() => {
    // Définir une fonction asynchrone fetchData pour effectuer la requête à l'API
    const fetchData = async () => {
      try {
        // Effectuer une requête GET à l'URL de l'API pour obtenir les données du Pokémon 
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}?limit=1302/`);
      
        // Mettre à jour le state avec les données récupérées depuis l'API
        setPokemonData(response.data);
      } catch (error) {
        // Gérer les erreurs en cas d'échec de la requête
        console.error('Error fetching data:', error);
      }
    };

    // Appeler la fonction fetchData pour effectuer la requête lors du montage du composant
    fetchData();
  }, [pokemon]); // Le tableau `[pokemon]` en tant que deuxième argument indique que ce hook s'exécute à chaque fois que la valeur de `pokemon` change.


  // Si les données du Pokémon ne sont pas encore chargées, afficher un message de chargement
  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  // Extraire les données nécessaires du state pokemonData
  const { name, sprites, types, weight, stats, cries} = pokemonData;

  // Rendre les informations du Pokémon dans le composant de carte
   return (
    <div className="card" style={{ width: '15rem',  height:'23rem'}}>
    <img src={sprites.front_default} className="w-32 h-32 mx-auto" alt={`${name} sprite`} />
    <div className="px-6 py-4">
        <div className="text-gray-700 text-base">
        <span className="font-bold">Nom: </span>{name}
          </div>
        <div className="text-gray-700 text-base">
          <span className="font-bold">Type: </span> {types[0].type.name}
        </div>
        <div className="text-gray-700 text-base">
          <span className="font-bold">Statistiques: </span> {stats[0].base_stat}
        </div>
        <div className="text-gray-700 text-base">
          <span className="font-bold">Nom des Statistiques: </span> {stats[0].stat.name}
        </div>
        <div className="text-gray-700 text-base">
          <span className="font-bold">Poids: </span> {weight}
        </div>
        <audio className="w-full mt-4" controls>
          <source src={cries.latest} type="audio/mpeg" />
          
        </audio>
      </div>
    </div>
  );
};
// Exporter le composant Card pour qu'il soit accessible depuis d'autres fichiers
export default Card;
