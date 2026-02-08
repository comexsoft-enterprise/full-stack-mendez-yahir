import { Location } from "../../domain/location";
import { EncounterFromApi } from "../dto/encounter-from-api";

export function MapApiToLocation(location:EncounterFromApi): Location{
    const { name } = location.location_area;
    return {
        name: name,
    }
}