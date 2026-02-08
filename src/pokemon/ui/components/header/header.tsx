import { SearchBar } from '../search-bar/SearchBar';
import styles from './header.module.css';
import { ModeSwitch } from './mode-switch/ModeSwitch';

interface Props {

}

export function Header() {
    const handleSearch = (query: string) => {

    };

    const handleToggle = (newState: boolean) => {

    };

    return (
        <nav className={styles.nav}>
            <h1 className={styles.title}>POKEDEX</h1>

            <SearchBar className={styles.search} onSearch={handleSearch} />
            <ModeSwitch className={styles.switch} onToggle={handleToggle} />

        </nav>
    )
}