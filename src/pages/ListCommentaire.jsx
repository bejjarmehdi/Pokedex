import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './components/Layout';

function ListCommentaire() {
  const [commentaires, setCommentaires] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/client')
      .then(response => {
        setCommentaires(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des commentaires:', error);
      });
  }, []);

  // Fonction pour supprimer un commentaire
  const deleteCommentaire = (id) => {
    axios.delete(`http://localhost:5000/client/${id}`)
      .then(response => {
        // Met à jour la liste des commentaires après la suppression
        setCommentaires(commentaires.filter(commentaire => commentaire.id !== id));
        console.log('Commentaire supprimé avec succès.');
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du commentaire:', error);
      });
  };

  return (
    <Layout>
      <div className="container mx-auto p-3">
        <h2 className="text-2xl font-bold mb-4 text-white">Liste des Commentaires</h2>
        <ul>
          {commentaires.map(commentaire => (
            <li key={commentaire.id} className="mb-4 p-4 border rounded-lg shadow-md bg-gray-800">
              <p className="text-lg font-semibold text-red-500">Nom: <span className="font-normal text-white">{commentaire.nom}</span></p>
              <p className="text-lg font-semibold text-red-500">Prénom: <span className="font-normal text-white">{commentaire.prenom}</span></p>
              <p className="text-lg font-semibold text-red-500">Commentaire: <span className="font-normal text-white">{commentaire.commentaire}</span></p>
              <button onClick={() => deleteCommentaire(commentaire.id)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md">Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default ListCommentaire;
