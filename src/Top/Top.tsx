import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./searchBar";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import "./Top.css"; // Import the CSS file

// Type for Pokemon object
interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

const ITEMS_PER_PAGE = 5;

const Top: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const detailsId = searchParams.get("details");

  const fetchAllPokemon = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
      if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      const data = await response.json();

      const promises = data.results.map(async (pokemon: { url: string }) => {
        const res = await fetch(pokemon.url);
        if (!res.ok) throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
        return res.json();
      });

      const pokemonDetails = await Promise.all(promises);
      setAllPokemon(pokemonDetails);
      setFilteredPokemon(pokemonDetails);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllPokemon();
  }, [fetchAllPokemon]);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = allPokemon.filter((p) => p.name.includes(query.toLowerCase()));
      setFilteredPokemon(filtered);
      setSearchParams({ page: "1" });
      setLoading(false);
    }, 500);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const handleItemClick = (pokemonId: number) => {
    setSearchParams({ page: currentPage.toString(), details: pokemonId.toString() });
  };

  const handleCloseDetails = () => {
    setSearchParams({ page: currentPage.toString() });
  };

  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);
  const paginatedPokemon = filteredPokemon.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const selectedPokemon = detailsId
    ? filteredPokemon.find((pokemon) => pokemon.id === Number(detailsId))
    : null;

  return (
    <div className="container">
      <div className="left-section">
        <h2>Введите запрос</h2>
        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
        {loading && <p className="loading-text">Загрузка...</p>}
        {error && <p className="error">{error}</p>}
        <PokemonList pokemonList={paginatedPokemon} onItemClick={handleItemClick} />
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
      </div>
      {selectedPokemon && (
        <div className="right-section">
          <button onClick={handleCloseDetails}>Закрыть</button>
          {loading ? (
            <p>Загрузка данных о покемоне...</p>
          ) : (
            <div>
              <h3>{selectedPokemon.name}</h3>
              <p>Height: {selectedPokemon.height}</p>
              <p>Weight: {selectedPokemon.weight}</p>
              <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Top;
