import React from "react";

interface PokemonListProps {
   pokemonList: any[];
   onItemClick: (pokemonId: number) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonList, onItemClick }) => {
   return (
      <div>
         {pokemonList.map((pokemon) => (
            <div key={pokemon.id} onClick={() => onItemClick(pokemon.id)} style={{ cursor: "pointer" }}>
               <h3>{pokemon.name}</h3>
            </div>
         ))}
      </div>
   );
};

export default PokemonList;
