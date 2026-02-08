import { SearchBar } from '../search-bar/SearchBar';
import styles from './header.module.css';
import { ModeSwitch } from '../mode-switch/ModeSwitch';

interface Props {
    onToggleMode?: (enabled: boolean) => void;
    onSearch?: (query: string) => void;
}

export function Header({ onToggleMode, onSearch }: Props) {
    const handleSearch = (query: string) => {
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleToggle = (newState: boolean) => {
        if (onToggleMode) {
            onToggleMode(newState);
        }
    };

    return (
        <nav className={styles.nav}>
            <h1 className={styles.title}>POKEDEX</h1>

            <SearchBar className={styles.search} onSearch={handleSearch} />
            <ModeSwitch className={styles.switch} onToggle={handleToggle} />

        </nav>
    )
}