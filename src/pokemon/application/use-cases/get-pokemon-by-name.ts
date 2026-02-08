import { Pokemon } from "../../domain/pokemon";
import { IPokemonRepository } from "../repositories/pokemon-repository";

export class GetPokemonByNameUseCase {
    constructor(private readonly repository: IPokemonRepository) { }

    async execute(name: string): Promise<Pokemon | null> {
        return this.repository.getPokemonByName(name);
    }
}
