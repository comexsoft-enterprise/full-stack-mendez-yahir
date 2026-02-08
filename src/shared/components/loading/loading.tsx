import styles from './loading.module.css';

interface Props {
    fullScreen?: boolean;
}

export function Loading({ fullScreen = false }: Props) {
    return (
        <div className={`${styles.spinnerContainer} ${fullScreen ? styles.fullScreen : ''}`}>
            <div className={styles.pokeballSpinner}></div>
        </div>
    );
}
