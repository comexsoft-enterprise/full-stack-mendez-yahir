import { PokemonFromApi } from '../dto/pokemon-from-api';
import { PokemonLocation } from '../../domain/pokemon-location';
import { Pokemon } from '../../domain/pokemon';
import { SkillFromApi } from '../dto/skill-from-api';
import { MapApiToSkills } from './api-to-skills';
import { MapApiToStats } from './api-to-stats';

export function MapApiToPokemon( pokemonFromApi: PokemonFromApi,abilitiesApi:SkillFromApi[],encounters:PokemonLocation[]) : Pokemon{
    const { id, name, base_experience,sprites,stats } = pokemonFromApi;
      console.log(pokemonFromApi.sprites)
    return {
        id : id,
        name : name ?? "UNKNOWN",
        frontImage : sprites.front_default  ?? sprites.front_shiny ?? "UNKNOWN",
        animatedImage : sprites.other.showdown.front_default ?? sprites.other.showdown.front_shiny ?? "UNKNOWN",
        baseExperience : base_experience ?? 0,
        skills : MapApiToSkills(abilitiesApi),
        stats : MapApiToStats(stats),
        encounters : encounters,
    }
}
