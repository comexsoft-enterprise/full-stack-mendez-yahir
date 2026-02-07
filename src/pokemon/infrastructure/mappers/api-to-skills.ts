import { Skill } from "../../domain/skill"
import { SkillFromApi } from "../dto/skill-from-api";

export function MapApiToSkills(abilityDetails: SkillFromApi[]) : Skill[]{
    
    return abilityDetails.map((ability) => mapApiToSkill(ability));
}

const mapApiToSkill = (ability: SkillFromApi) : Skill =>{
    return {
        id : ability.id,
        name : ability.name,
        description : ability.flavor_text_entries ? getDescription(ability) : "UNKNOWN"
    }
}

const getDescription = (ability : SkillFromApi, langs = ["en","fr"]) : string => {
    for(const lang of langs){
        const description = ability.flavor_text_entries.find((entry) => entry.language.name === lang);
        if(description?.flavor_text){
            return description.flavor_text;
        }
    }
    return "UNKNOWN";   
}