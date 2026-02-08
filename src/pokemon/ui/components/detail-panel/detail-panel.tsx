import { Pokemon } from '../../../domain/pokemon';
import { PokemonRadarChart } from '../pokemon-radar-chart/pokemon-radar-chart';
import styles from './detail-panel.module.css';
import { useState, useEffect } from 'react';

interface Props {
    pokemon: Pokemon | null;
    isOpen: boolean;
    onClose: () => void;
}

type ViewState = 'overview' | 'abilities' | 'locations';

export function DetailPanel({ pokemon, isOpen, onClose }: Props) {
    const [view, setView] = useState<ViewState>('overview');

    // Reset view when pokemon changes or panel closes
    useEffect(() => {
        if (!isOpen) {
            setView('overview');
        }
    }, [isOpen, pokemon]);

    if (!pokemon) return null;

    const renderOverview = () => (
        <>
            <div className={styles.imageContainer}>
                <img src={pokemon.frontImage} alt={pokemon.name} className={styles.image} />
            </div>

            <div className={styles.chartContainer}>
                <PokemonRadarChart stats={pokemon.stats} />
            </div>

            <div className={styles.badges}>
                <span className={styles.badge_exp}>EXP: {pokemon.baseExperience}</span>
                <span className={styles.badge_species}>SPECIES: {pokemon.name.toUpperCase()}</span>
            </div>

            <div className={styles.infoSection} onClick={() => setView('abilities')}>
                <h3>SKILLS:</h3>
                <div className={styles.abilities}>
                    {pokemon.skills.map((skill, index) => (
                        <span key={index} className={styles.abilityBtn}>
                            {skill.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.locationSection}>
                <div className={styles.locationBox} onClick={() => setView('locations')}>
                    <p>Located in {pokemon.encounters[0]?.location?.name || 'the depths of the forest'}.</p>
                </div>
            </div>
        </>
    );

    const renderAbilities = () => (
        <div className={styles.subPanel}>
            <button className={styles.backBtn} onClick={() => setView('overview')}>{'< BACK'}</button>
            <h3>Skills of {pokemon.name}</h3>
            <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemon.skills.map(skill => (
                            <tr key={skill.id}>
                                <td>{skill.name}</td>
                                <td>{skill.description || 'No description available'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderLocations = () => (
        <div className={styles.subPanel}>
            <button className={styles.backBtn} onClick={() => setView('overview')}>{'< BACK'}</button>
            <h3>Locations of {pokemon.name}</h3>
            <div className={styles.tableContainer}>
                {pokemon.encounters.length > 0 ? (
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th>Chance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.encounters.map((encounter, index) => (
                                <tr key={index}>
                                    <td>{encounter.location.name}</td>
                                    <td>{encounter.chance}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No locations found (Located in the depths of the forest).</p>
                )}
            </div>
        </div>
    );

    return (
        <aside className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
            <button className={styles.closeBtn} onClick={onClose}>X</button>

            <div className={styles.header}>
                <h2 className={styles.name}>{pokemon.name.toUpperCase()}</h2>
            </div>

            <div className={styles.content}>
                {view === 'overview' && renderOverview()}
                {view === 'abilities' && renderAbilities()}
                {view === 'locations' && renderLocations()}
            </div>
        </aside>
    );
}
