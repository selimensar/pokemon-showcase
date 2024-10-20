import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import axios from 'axios'; // Import Axios for making API requests

const PokemonGallery = () => {
    // State to store the collection of Pokémon
  const [pokemonCollection, setPokemonCollection] = useState([]);

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
            pokemonImage: pokemonDetails.data.sprites.front_default, // Pokémon image URL
            pokemonWeight: pokemonDetails.data.weight,
          };
        });

        // Wait for all promises to resolve and set the state
        const fetchedPokemonCollection = await Promise.all(pokemonDetailsPromises);
        setPokemonCollection(fetchedPokemonCollection); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData(); // Call the function to fetch data
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="pokemon-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1280px] mx-auto px-4">
      {pokemonCollection.map((pokemon, index) => ( // Map over the Pokémon collection to render cards
        <div key={index} className="pokemon-card bg-white shadow-lg rounded-lg p-4 text-center transform transition-transform hover:-translate-y-2">
          <img src={pokemon.pokemonImage} alt={pokemon.pokemonName} className="pokemon-image mx-auto mb-2"/>
          <h2 className="pokemon-name text-lg font-bold capitalize">{pokemon.pokemonName}</h2>
          <p>Weight: {pokemon.pokemonWeight}</p>
        </div>
      ))}
    </div>
  );
};

export default PokemonGallery;
