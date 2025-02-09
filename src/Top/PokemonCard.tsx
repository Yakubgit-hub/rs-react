import React from "react";

interface PokemonCardProps {
   pokemon: {
      id: number;
      name: string;
      base_experience: number;
      sprites: { front_default: string };
   };
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
   return (
      <div className="pokemon-card">
         <h3>{pokemon.name}</h3>
         <img src={pokemon.sprites.front_default} alt={pokemon.name} />
         <p><b>Опыт:</b> {pokemon.base_experience}</p>
      </div>
   );
};

export default PokemonCard;