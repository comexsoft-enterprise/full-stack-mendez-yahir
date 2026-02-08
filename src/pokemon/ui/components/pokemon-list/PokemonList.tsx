import { Pokemon } from "../../../domain/pokemon"
import { PokemonCard } from "../pokemon-card/PokemonCard"
import Styles from './PokemonList.module.css';

interface Props{
    pokemonList:Pokemon[]
}

export function PokemonList({pokemonList}:Props){
    return (
        <ul className={Styles.container}>
            {
                pokemonList.map((pokemon) => {
                    return(
                        <li key={pokemon.id}>
                            <PokemonCard animatedImage={pokemon.animatedImage} name={pokemon.name}/>
                        </li>
                    )
                })
            }
        </ul>
    )
}