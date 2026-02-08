import { Pokemon } from "../../domain/pokemon";
import { IPokemonRepository } from "./pokemon-repository";
import { PokemonApiService } from '../../infrastructure/services/pokemon-api-service';
import { MapApiToPokemon } from '../../infrastructure/mappers/api-to-pokemon';
import { PokemonFromApi } from "../../infrastructure/dto/pokemon-from-api";
import { SkillFromApi } from "../../infrastructure/dto/skill-from-api";
import { EncounterFromApi } from "../../infrastructure/dto/encounter-from-api";
import { PokemonLocation } from "../../domain/pokemon-location";
import { MapApiToEncounters } from "../../infrastructure/mappers/api-to-encounters";

export class PokemonRepository implements IPokemonRepository {
    constructor(private pokemonApiService:PokemonApiService){}

    async listPokemon(limit: number = 20, offset: number = 0): Promise<Pokemon[]> {
        const allPokemonFromAPi: PokemonFromApi[] = await this.pokemonApiService.getAll(limit, offset);
        return Promise.all(allPokemonFromAPi.map(async (pokemonFromAPi) => this.buildPokemon(pokemonFromAPi)));
    };

    private async buildPokemon(pokemonFromAPi: PokemonFromApi) {
        const skillUrls: string[] = this.filterSkillUrls(pokemonFromAPi.abilities);
        const locationUrl: string = pokemonFromAPi.location_area_encounters;
        const skillsFromApi: SkillFromApi[] = await this.pokemonApiService.getSkills(skillUrls);
        const encountersFromApi: EncounterFromApi[] = await this.pokemonApiService.getEncounters(locationUrl);
        const pokemonLocation: PokemonLocation[] = MapApiToEncounters(encountersFromApi);
        return MapApiToPokemon(pokemonFromAPi, skillsFromApi, pokemonLocation);
    }

    private filterSkillUrls = (skills: PokemonFromApi["abilities"]): string[] => {
        return skills.map((item) => item.ability.url)
    }

}