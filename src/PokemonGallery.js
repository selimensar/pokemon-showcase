import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import axios from 'axios'; // Import Axios for making API requests

const PokemonGallery = () => {
  // State to store the collection of Pokémon
  const [pokemonCollection, setPokemonCollection] = useState([]);

  // State to store the currently selected Pokémon for modal view
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // useEffect hook to fetch Pokémon data when the component mounts
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // Fetch the initial list of Pokémon (limited to 50)
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
        const pokemonList = response.data.results;

        // Map over the list to fetch detailed data for each Pokémon
        const pokemonDetailsPromises = pokemonList.map(async (pokemon) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return {
            pokemonName: pokemonDetails.data.name,
            pokemonImage: pokemonDetails.data.sprites.front_default, // Small Pokémon image URL
            pokemonLargeImage: pokemonDetails.data.sprites.other['official-artwork'].front_default, // Larger image for modal
            pokemonWeight: pokemonDetails.data.weight, // Pokémon's weight
          };
        });

        // Wait for all promises to resolve and set the state with fetched Pokémon collection
        const fetchedPokemonCollection = await Promise.all(pokemonDetailsPromises);
        setPokemonCollection(fetchedPokemonCollection);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData(); // Call the function to fetch data
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to open the modal and show larger Pokémon image
  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon); // Set the selected Pokémon for modal
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedPokemon(null); // Reset the selected Pokémon to close the modal
  };

  // Function to close modal when clicking outside the modal content
  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('modal-background')) {
      closeModal(); // Close modal if background is clicked
    }
  };

  return (
    <div>
      {/* Pokémon card grid container */}
      <div className="pokemon-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1280px] mx-auto px-4">
        {pokemonCollection.map((pokemon, index) => (
          <div
            key={index}
            className="pokemon-card bg-white shadow-lg rounded-lg p-4 text-center transform transition-transform hover:-translate-y-2 cursor-pointer" // Add hover and cursor-pointer for selection effect
            onClick={() => openModal(pokemon)} // On click, open modal to show larger image
          >
            <img src={pokemon.pokemonImage} alt={pokemon.pokemonName} className="pokemon-image mx-auto mb-2" />
            <h2 className="pokemon-name text-lg font-bold capitalize">{pokemon.pokemonName}</h2>
            <p>Weight: {pokemon.pokemonWeight}</p>
          </div>
        ))}
      </div>

      {/* Modal to display larger Pokémon image */}
      {selectedPokemon && (
        <div
          className="modal-background fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleBackgroundClick} // Attach background click event to close modal
        >
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center" onClick={(e) => e.stopPropagation()}> {/* Prevent modal content click from closing modal */}
            <h2 className="text-2xl font-bold capitalize mb-4">{selectedPokemon.pokemonName}</h2>
            <img src={selectedPokemon.pokemonLargeImage} alt={selectedPokemon.pokemonName} className="w-full h-auto mb-4" />
            <p className="mb-4">Weight: {selectedPokemon.pokemonWeight}</p>
            <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Close</button> {/* Button to close the modal */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonGallery;
