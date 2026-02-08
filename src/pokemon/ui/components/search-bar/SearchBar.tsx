import { useState, ChangeEvent } from 'react';
import styles from './SearchBar.module.css';

interface Props {
  onSearch: (value: string) => void;
  className:string
}

export const SearchBar = ({ onSearch, className }: Props) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.bar}>
        <svg 
          className={styles.icon} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className={styles.input}
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};