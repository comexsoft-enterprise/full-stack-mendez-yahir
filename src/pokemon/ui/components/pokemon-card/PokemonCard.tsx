import styles from './PokemonCard.module.css';

interface props{
    animatedImage:string,
    name:string
}


export function PokemonCard(props:props){
    return( 
        <div className={styles.container}>
            <img className={styles.container__image} src={props.animatedImage} alt={props.name}/>
        </div>
    )
}