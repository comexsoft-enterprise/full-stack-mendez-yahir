import { IPokemonRepository } from "../repositories/pokemon-repository";

export class GetAllPokemonNamesUseCase {
    constructor(private readonly repository: IPokemonRepository) { }

    async execute(): Promise<string[]> {
        return this.repository.getAllNames();
    }
}
