import { useState } from "react";
import { Pokemon } from '../../domain/pokemon';
import { ListPokemonUseCase } from '../../application/use-cases/list-pokemon';

export function useListPokemon(ListPokemonUseCase: ListPokemonUseCase){
    const [ pokemon, setPokemon ] = useState<Pokemon[]>([])
    const [ loading, setLoading ] = useState(false);

    const fetchPokemon = async (limit = 20, offset = 0) =>{
        try{
            setLoading(true);
            const listPokemon = await ListPokemonUseCase.execute(limit,offset);
            setPokemon(listPokemon);
        }catch(err){
            console.error("Error: ",err)
        }finally{
            setLoading(false);
        }
    }

    return { pokemon, loading, fetchPokemon }
}