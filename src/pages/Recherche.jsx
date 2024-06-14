// Importe React ainsi que les hooks useState et useEffect depuis la bibliothèque react
import React, { useState, useEffect } from 'react';
// Importe le hook useRouter depuis la bibliothèque next/router
import { useRouter } from 'next/router';
// Importe le composant SearchBar depuis le fichier './components/SearchBar'
import SearchBar from './components/SearchBar';
// Importe le composant Card depuis le fichier './components/Card'
import Card from './components/Card';
// Importe le composant Link depuis la bibliothèque next/link
import Link from 'next/link';
// Importez la bibliothèque axios pour effectuer des requêtes HTTP
import axios from 'axios';
import Layout from './components/Layout';
import Image from "next/image";



// Définit le composant Recherche
const Recherche = () => {
  // Initialise le hook useRouter dans la variable router
  const router = useRouter();
  // Initialise un état pour stocker le terme de recherche
  const [poke, setPoke] = useState("");
  const [comment, setComment] = useState(""); // État pour stocker le commentaire
  const [name, setName] = useState(""); // État pour stocker le nom
  const [prenom, setPrenom] = useState(""); // État pour stocker le prénom

  // Utilise useEffect pour mettre à jour le terme de recherche à partir de l'URL
  useEffect(() => {
    // Destructure le terme de recherche depuis l'URL
    const { q } = router.query;
    // Met à jour l'état poke avec le terme de recherche, s'il existe
    if (q) {
      setPoke(q);
    }
  }, [router.query]);

  // Fonction pour gérer le changement de commentaire
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Fonction pour gérer le changement de nom
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Fonction pour gérer le changement de prénom
  const handlePrenomChange = (e) => {
    setPrenom(e.target.value);
  };

  // Fonction pour envoyer les données à la base de données
  const sendDataToDatabase = () => {
    // Vérifiez que les données nécessaires sont remplies
    if (name && prenom && comment) {
      // Envoie les données à la base de données
      axios.post('http://localhost:5000/client', {
        nom: name,
        prenom: prenom,
        commentaire: comment
      })
      .then(response => {
        // Gérez la réponse de la base de données si nécessaire
        console.log(response.data);
      })
      .catch(error => {
        // Gérez les erreurs si la requête échoue
        console.error('Erreur lors de l\'envoi des données à la base de données:', error);
      });
    } else {
      // Affichez un message d'erreur si des données sont manquantes
      console.error('Veuillez remplir tous les champs.');
    }
  };

  // Rendu du composant Recherche
  return (
    <Layout>
  <div className="flex items-center justify-between p-4 bg-gray-800">
    <div className="flex items-center justify-end flex-1 mt-[-150px]  mr-[50px]">
    <Link href="ListCommentaire">
      <Image
        src="/commentaire.png"
        alt="commentaire"
        width={40}
        height={15}
      />
    </Link>
    </div>
    
  </div>


      
        {poke && (<div className="flex justify-center mb-4 ">
        <Card pokemon={poke} />
        </div>)}
        <div className="flex flex-col items-center">
        <div className="w-full max-w-lg mt-6">
          <div className="flex justify-center mb-4">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Nom"
              className="w-1/2 p-2 border border-gray-300 rounded-lg mr-2"
            />
            <input
              type="text"
              value={prenom}
              onChange={handlePrenomChange}
              placeholder="Prénom"
              className="w-1/2 p-2 border border-gray-300 rounded-lg ml-2"
            />
          </div>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Ajouter un commentaire..."
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          />
          <div className="flex flex-col items-center">
          <button
            onClick={sendDataToDatabase}
            
            className="w-1/2 bg-blue-700 text-amber-500 p-2 rounded-lg font-bold border-4 border-amber-500  mb-[200px]"
          >
            Envoyer les données
          </button>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Recherche;