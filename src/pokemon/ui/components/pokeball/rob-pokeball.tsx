import { useState } from 'react';
import styles from './rob-pokeball.module.css';
import PokeballImage from '../../../../assets/ball.svg';

interface Props {
    onToggle: () => void;
    isOpen: boolean;
    onDrop?: (pokemonId: number) => void;
    isFreeMode?: boolean;
}

export function RobPokeball({ onToggle, isOpen, onDrop, isFreeMode }: Props) {
    const [isHovered, setIsHovered] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        if (isFreeMode) {
            e.preventDefault();
            setIsHovered(true);
        }
    };

    const handleDragLeave = () => {
        setIsHovered(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        if (isFreeMode && onDrop) {
            e.preventDefault();
            const pokemonId = e.dataTransfer.getData("pokemonId");
            if (pokemonId) {
                onDrop(Number(pokemonId));
                setIsHovered(false);
            }
        }
    };

    return (
        <div 
            className={`${styles.container} ${isOpen ? styles.open : ''} ${isHovered ? styles.hovered : ''}`}
            onClick={onToggle}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
        >
            <img 
                src={PokeballImage} 
                className={styles.image} 
                alt="Pokeball Trigger" 
            />
        </div>
    );
}
