import { Pokemon } from "../../../domain/pokemon"
import { PokemonCard } from "../pokemon-card/PokemonCard"
import Styles from './PokemonList.module.css';
import { useEffect, useRef } from "react";
import { Loading } from "../../../../shared/components/loading/loading";

interface Props {
    pokemonList: Pokemon[];
    onSelect: (pokemon: Pokemon) => void;
    selectedId: number | null;
    isFreeMode: boolean;
    onLoadMore: () => void;
    loading: boolean;
}

export function PokemonList({ pokemonList, onSelect, selectedId, isFreeMode, onLoadMore, loading }: Props) {
    const listRef = useRef<HTMLUListElement>(null);

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    onLoadMore(); // Load more when bottom is reached
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        const currentList = listRef.current;
        // Observe the last element (pokemon or loading spinner)
        if (currentList && currentList.lastElementChild) {
            observer.observe(currentList.lastElementChild);
        }

        return () => {
            observer.disconnect();
        }
    }, [pokemonList, onLoadMore, loading]);

    return (
        <ul className={Styles.container} ref={listRef}>
            {
                pokemonList.map((pokemon) => {
                    return (
                        <li key={pokemon.id}>
                            <PokemonCard
                                animatedImage={pokemon.animatedImage}
                                name={pokemon.name}
                                id={pokemon.id}
                                isFreeMode={isFreeMode}
                                onClick={() => !isFreeMode && onSelect(pokemon)}
                                isSelected={selectedId === pokemon.id}
                            />
                        </li>
                    )
                })
            }
            {loading && (
                <li className={Styles.loadingItem}>
                    <Loading />
                </li>
            )}
        </ul>
    )
}
