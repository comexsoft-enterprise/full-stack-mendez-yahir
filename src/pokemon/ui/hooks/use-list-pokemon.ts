import { useState } from "react";
import { Pokemon } from '../../domain/pokemon';
import { ListPokemonUseCase } from '../../application/use-cases/list-pokemon';

export function useListPokemon(ListPokemonUseCase: ListPokemonUseCase) {
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(false);

    const fetchPokemon = async (limit = 20, offset = 0) => {
        try {
            setLoading(true);
            const listPokemon = await ListPokemonUseCase.execute(limit, offset);
            setPokemon(prev => {
                const newPokemon = listPokemon.filter(p => !prev.some(existing => existing.id === p.id));
                return [...prev, ...newPokemon];
            });
        } catch (err) {
            console.error("Error: ", err)
        } finally {
            setLoading(false);
        }
    }

    const removePokemon = (id: number) => {
        setPokemon(prev => prev.filter(p => p.id !== id));
    }

    const addPokemon = (newPokemon: Pokemon) => {
        setPokemon(prev => [newPokemon, ...prev]);
    }

    return { pokemon, loading, fetchPokemon, removePokemon, addPokemon }
}