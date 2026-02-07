export interface PokemonFromApi {
    id: number,
    name: string,
    base_experience:number,
    sprites:{
        home:{
            front_default:string, 
            front_shiny:string, //fallback
        },
        other:{
            showdown:{
                front_default:string,
                front_shiny:string, //fallback
            }
        }
    },
    stats: {
        base_stat: number,
        stat: {
            name: string,
        }
    }[],
    location_area_encounters: string,
    abilities: {
        ability:{
            name:string,
            url:string,
        }
    }[],
}