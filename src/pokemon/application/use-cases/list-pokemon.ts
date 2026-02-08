import { PokemonRepository } from '../repositories/pokemon-repository-impl';

export class ListPokemonUseCase {
  constructor(private pokemonRepository: PokemonRepository) {}

  async execute(limit: number, offset: number) {
    return this.pokemonRepository.listPokemon(limit, offset)
  }
}