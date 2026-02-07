export interface SkillFromApi{
    id:number,
    name:string,
    flavor_text_entries:{
        flavor_text:string,
        language:{
            name:string,
        },
    }[]
}