import { Location } from './location';
import { Skill } from './skill';
import { Stat } from './stat';

export interface Pokemon{
    id:number,
    name:string,
    frontImage:string,
    animatedImage:string,
    baseExperience:number,
    skills:Skill[],
    stats:Stat[],
    locations:Location[],
}
