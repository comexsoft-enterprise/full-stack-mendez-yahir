import { Pokemon } from '../../domain/pokemon';

export interface IPokemonRepository{
    listPokemon(): Promise<Pokemon[]>
}