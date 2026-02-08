import { Pokemon } from '../../domain/pokemon';

export interface IPokemonRepository {
    listPokemon(limit?: number, offset?: number): Promise<Pokemon[]>
    getPokemonByName(name: string): Promise<Pokemon | null>
    getAllNames(): Promise<string[]>
}