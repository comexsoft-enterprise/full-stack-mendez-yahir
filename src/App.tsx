import { useEffect, useState } from 'react'
import './App.css'
import { PokemonApiService } from './pokemon/infrastructure/services/pokemon-api-service';
import { PokemonRepository } from './pokemon/application/repositories/pokemon-repository-impl';
import { ListPokemonUseCase } from './pokemon/application/use-cases/list-pokemon';
import { useListPokemon } from './pokemon/ui/hooks/use-list-pokemon';
import { PokemonCard } from './pokemon/ui/components/pokemon-card/PokemonCard';

// dependencies configuration
const service = new PokemonApiService();
const repository = new PokemonRepository(service);
const listPokemonUseCase = new ListPokemonUseCase(repository);

export default function App() {
  const { pokemon, loading, fetchPokemon } = useListPokemon(listPokemonUseCase);

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading) return <div>Is loading...</div>
  return (
    <div>
      <h1>Pokémon List</h1>
      <ul>
        {pokemon.map(p => (
          <li key={p.id}>
            {
              <PokemonCard animatedImage={p.animatedImage} name={p.name}></PokemonCard>
            }
          </li>
        ))}
      </ul>
    </div>
  );

}