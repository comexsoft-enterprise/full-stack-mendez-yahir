import styles from './PokemonCard.module.css';

interface props {
    animatedImage: string,
    name: string,
    id: number,
    isFreeMode?: boolean,
    onClick?: () => void,
    isSelected?: boolean
}


export function PokemonCard(props: props) {
    const handleDragStart = (e: React.DragEvent) => {
        if (props.isFreeMode) {
            e.dataTransfer.setData("pokemonId", props.id.toString());
            e.dataTransfer.effectAllowed = "move";
        } else {
            e.preventDefault();
        }
    };

    return (
        <div
            className={`${styles.container} ${props.isSelected ? styles.selected : ''} ${props.isFreeMode ? styles.grab : styles.pointer}`}
            onClick={props.onClick}
            draggable={props.isFreeMode}
            onDragStart={handleDragStart}
        >
            <img className={styles.container__image} src={props.animatedImage} alt={props.name} />
        </div>
    )
}