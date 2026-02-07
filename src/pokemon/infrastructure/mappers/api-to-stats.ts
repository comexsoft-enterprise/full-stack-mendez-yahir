import { Stat } from "../../domain/stat";
import { PokemonFromApi } from "../dto/pokemon-from-api";

export function MapApiToStats(statsApi:PokemonFromApi["stats"]) : Stat[]{
    return statsApi.map((statApi) => mapApiToStat(statApi))
}

const mapApiToStat = (statApi: PokemonFromApi["stats"][number]) : Stat =>{
    return {
        name : statApi.stat.name ?? "UNKNOWN",
        value : statApi.base_stat ?? 0,
    }
}