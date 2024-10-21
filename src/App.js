import React from 'react';
import PokemonGallery from './PokemonGallery';  
import logo from './logo.svg';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col"> 
      <header className="header-section flex flex-col md:flex-row items-center justify-center py-8">
        <img src={logo} alt="Pokémon Showcase Logo" className="md:mr-4 w-18 h-20" />
        <div className="text-center md:text-left">
          <h1 className="header-title text-4xl font-bold">Pokémon Showcase</h1>
          <p className="header-subtitle text-lg mt-2">Featuring 50 Pokémon from the PokéAPI</p>
        </div>
      </header>

      <main className="flex-grow">
        <PokemonGallery /> {/* Render the PokemonGallery component */}
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center mt-8">
        <p className="text-sm">© 2024 Pokémon Showcase. This project is licensed under the MIT License.</p>
        <p className="text-sm">
          <a href="https://pokeapi.co/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
            Data provided by PokéAPI
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
