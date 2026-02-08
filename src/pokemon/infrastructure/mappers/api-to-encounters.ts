import { PokemonLocation } from "../../domain/pokemon-location";
import { EncounterFromApi } from "../dto/encounter-from-api";
import { MapApiToLocation } from './api-to-location';

export function MapApiToEncounters(encounters:EncounterFromApi[]): PokemonLocation[]{
    return encounters.map((encounter) => MapApiToEncounter(encounter))
}

export function MapApiToEncounter(encounter:EncounterFromApi): PokemonLocation{
    return{
        location: MapApiToLocation(encounter),
        chance: filterMaxChance(encounter.version_details)
    }
}

const filterMaxChance = (versions:EncounterFromApi["version_details"]): number => {
    return versions.reduce((max, version) => Math.max(max, version.max_chance), 0)
}