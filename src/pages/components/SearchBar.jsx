// Définit une fonction SearchBar qui prend un objet en tant qu'argument
function SearchBar({ onSearch }) {
  // Définit une fonction handleSearch qui sera exécutée lors de la soumission du formulaire
  const handleSearch = (e) => {
    // Empêche le chargement automatique de la page Web lors de la soumission du formulaire
    e.preventDefault();
    // Extrait la valeur saisie par l'utilisateur dans le champ de saisie du formulaire de recherche
    const searchTerm = e.target.elements.searchTerm.value;
    // Appelle la fonction onSearch avec le terme de recherche saisi par l'utilisateur comme argument
    onSearch(searchTerm);
    // Affiche le terme de recherche dans la console à des fins de débogage
    console.log("Terme de recherche:", searchTerm);
  };

  // Retourne un formulaire qui appelle la fonction handleSearch lorsqu'il est soumis
  return (
    <form onSubmit={handleSearch} className="max-w-xs mx-auto">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Recherche
      </label>
      <div className="relative">
        <input
          type="search"
          id="default-search"
          name="searchTerm"
          placeholder="    RECHERECHE"
          required
          className="block w-full max-w-xl h-12 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          type="submit"
          className="text-black absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Recherche
        </button>
      </div>
    </form>
  );
}

export default SearchBar;

