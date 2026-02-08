import { EncounterFromApi } from "../dto/encounter-from-api";
import { PokemonFromApi } from "../dto/pokemon-from-api";
import { PokemonListFromApi } from "../dto/pokemon-list-from-api";
import { SkillFromApi } from "../dto/skill-from-api";

export class PokemonApiService {
    constructor(private readonly API_URL = "https://pokeapi.co/api/v2/pokemon") { }


    async getAll(limit: number, offset: number): Promise<PokemonFromApi[]> {
        const response = await fetch(`${this.API_URL}?limit=${limit}&offset=${offset}`);
        const listPokemon: PokemonListFromApi = await response.json();

        const pokemonDetails: PokemonFromApi[] = await Promise.all(
            listPokemon.results.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                return response.json() as Promise<PokemonFromApi>;
            })
        )
        return pokemonDetails;
    }

    async getAllNames(): Promise<string[]> {
        const response = await fetch(`${this.API_URL}?limit=2000`); // Fetch a large number to get all names
        const listPokemon: PokemonListFromApi = await response.json();
        return listPokemon.results.map(p => p.name);
    }

    async getByName(name: string): Promise<PokemonFromApi | null> {
        try {
            const response = await fetch(`${this.API_URL}/${name.toLowerCase()}`);
            if (!response.ok) return null;
            return await response.json() as PokemonFromApi;
        } catch (error) {
            return null;
        }
    }

    async getSkills(listUrls: string[]): Promise<SkillFromApi[]> {

        const listSkill: SkillFromApi[] = await Promise.all(
            listUrls.map(async (url) => {
                const response = await fetch(url);
                return response.json() as Promise<SkillFromApi>
            })
        );
        return listSkill;
    }

    async getEncounters(url: string): Promise<EncounterFromApi[]> {
        const response = await fetch(url);
        const listEncounters: EncounterFromApi[] = await response.json();
        return listEncounters;
    }
}
