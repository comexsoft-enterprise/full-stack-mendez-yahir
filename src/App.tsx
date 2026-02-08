import { useEffect, useState } from 'react'
import styles from './App.module.css'
import { PokemonApiService } from './pokemon/infrastructure/services/pokemon-api-service';
import { PokemonRepository } from './pokemon/application/repositories/pokemon-repository-impl';
import { ListPokemonUseCase } from './pokemon/application/use-cases/list-pokemon';
import { useListPokemon } from './pokemon/ui/hooks/use-list-pokemon';
import { PokemonList } from './pokemon/ui/components/pokemon-list/PokemonList';
import { Header } from './pokemon/ui/components/header/header';
import { RobPokeball } from './pokemon/ui/components/pokeball/rob-pokeball';
import { DetailPanel } from './pokemon/ui/components/detail-panel/detail-panel';
import { Pokemon } from './pokemon/domain/pokemon';
import { Loading } from './shared/components/loading/loading';

import { GetPokemonByNameUseCase } from './pokemon/application/use-cases/get-pokemon-by-name';
import { GetAllPokemonNamesUseCase } from './pokemon/application/use-cases/get-all-pokemon-names';
import { useDebounce } from './pokemon/ui/hooks/use-debounce';

// dependencies configuration
const service = new PokemonApiService();
const repository = new PokemonRepository(service);
const listPokemonUseCase = new ListPokemonUseCase(repository);
const getPokemonByNameUseCase = new GetPokemonByNameUseCase(repository);
const getAllPokemonNamesUseCase = new GetAllPokemonNamesUseCase(repository);

export default function App() {
  const { pokemon, loading: listLoading, fetchPokemon, removePokemon, addPokemon } = useListPokemon(listPokemonUseCase);

  // Local state for search
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300); // Reduced delay for better responsiveness
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allNames, setAllNames] = useState<string[]>([]); // Search Index

  // Combine local loading with list loading
  const loading = listLoading || isSearching;

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isFreeMode, setIsFreeMode] = useState(false);
  const [caughtPokemon, setCaughtPokemon] = useState<Pokemon[]>([]); // Stored in pokeball

  // Initial load
  useEffect(() => {
    fetchPokemon(20, 0);
    // Load search index
    getAllPokemonNamesUseCase.execute().then(setAllNames);
  }, []);

  // Search Effect
  useEffect(() => {
    const handleSearch = async () => {
      if (!debouncedSearch) {
        setSearchedPokemon([]);
        return;
      }

      setIsSearching(true);
      try {
        // We filter the local index of names first to avoid spamming the API with every keystroke.
        // Once we have matches, we fetch the full details for just those pokemon.
        const matches = allNames
          .filter(name => name.includes(debouncedSearch.toLowerCase()))
          .slice(0, 10); // Limit to top 10 matches

        if (matches.length === 0) {
          setSearchedPokemon([]);
          return;
        }

        // Fetch details for matches
        const results = await Promise.all(matches.map(name => getPokemonByNameUseCase.execute(name)));
        const validResults = results.filter((p): p is Pokemon => p !== null);
        setSearchedPokemon(validResults);

      } catch (error) {
        console.error(error);
        setSearchedPokemon([]);
      } finally {
        setIsSearching(false);
      }
    };

    handleSearch();
  }, [debouncedSearch, allNames]);


  // Lock scroll when panel is open
  // Filter logic update
  const displayPokemon = searchQuery ? searchedPokemon : pokemon;

  // Lock scroll when panel is open
  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isPanelOpen]);

  const handleSelectPokemon = (p: Pokemon) => {
    // Toggle selection: if already selected, deselect it.
    if (selectedPokemon?.id === p.id) {
      setSelectedPokemon(null);
      setIsPanelOpen(false);
    } else {
      setSelectedPokemon(p);
    }
  };

  const handleTogglePanel = () => {
    if (isPanelOpen) {
      setIsPanelOpen(false);
      // Return caught pokemon when closing panel
      if (caughtPokemon.length > 0) {
        caughtPokemon.forEach(p => addPokemon(p));
        setCaughtPokemon([]);
        setSelectedPokemon(null);
      }
    } else {
      if (selectedPokemon || caughtPokemon.length > 0) {
        setIsPanelOpen(true);
      }
    }
  };

  const handleLoadMore = () => {
    if (!loading && !searchQuery) { // Disable infinite scroll when searching
      fetchPokemon(20, pokemon.length);
    }
  };

  const handleModeToggle = (enabled: boolean) => {
    setIsFreeMode(enabled);
    setIsPanelOpen(false); // Reset panel when switching modes
  };

  const handleDropPokemon = (id: number) => {
    const p = pokemon.find(p => p.id === id);
    if (p) {
      removePokemon(id);
      setCaughtPokemon(prev => [...prev, p]);
      setSelectedPokemon(p);
      setTimeout(() => setIsPanelOpen(true), 500);
    }
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    if (caughtPokemon.length > 0) {
      caughtPokemon.forEach(p => addPokemon(p));
      setCaughtPokemon([]);
      setSelectedPokemon(null);
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  }

  // Determine which list to show
  // If searching, show API results (searchedPokemon)
  // If not searching, show full list (pokemon)
  // Note: Local filtering of 'pokemon' is removed in favor of API search as requested.
  // Unless we want both? "conforme escribes haz aparecer los pokemones".
  // Let's stick to API search results when query exists.

  // The displayPokemon constant is already defined above, no need to redefine.

  return (
    <div className={styles.container}>
      {/* Initial Loading */}
      {loading && pokemon.length === 0 && !searchQuery && <Loading fullScreen={true} />}

      <section className={styles.container__main}>
        <Header onToggleMode={handleModeToggle} onSearch={handleSearch} />

        <PokemonList
          pokemonList={displayPokemon}
          onSelect={handleSelectPokemon}
          selectedId={selectedPokemon?.id || null}
          isFreeMode={isFreeMode}
          onLoadMore={handleLoadMore}
          loading={loading}
        />
      </section>

      <RobPokeball
        isOpen={isPanelOpen}
        onToggle={handleTogglePanel}
        onDrop={handleDropPokemon}
        isFreeMode={isFreeMode}
      />

      <DetailPanel
        pokemon={selectedPokemon}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />

    </div>
  );
}