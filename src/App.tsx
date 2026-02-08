import { useEffect, useState } from 'react'
import styles from './App.module.css'
import { PokemonApiService } from './pokemon/infrastructure/services/pokemon-api-service';
import { PokemonRepository } from './pokemon/application/repositories/pokemon-repository-impl';
import { ListPokemonUseCase } from './pokemon/application/use-cases/list-pokemon';
import { useListPokemon } from './pokemon/ui/hooks/use-list-pokemon';
import { PokemonCard } from './pokemon/ui/components/pokemon-card/PokemonCard';
import { PokemonList } from './pokemon/ui/components/pokemon-list/PokemonList';

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
    <div className={styles.container}>
      <section className={styles.container__main}>
        <header>POmeon</header>
        <PokemonList pokemonList={pokemon}/>
      </section>
      {/* panel */}
      <div className={styles.sidebar__docked}></div>
      <section className={styles.sidebar}>
        <div>

        </div>
        <div>

        </div>
      </section>
    </div>
  );

}