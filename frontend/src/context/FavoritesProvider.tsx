import { useState, useEffect} from 'react';
import { getFavoritesFromLocalStorage } from '../utils';
import { FavoritesContext } from './FavoritesContext';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {

  const [favorites, setFavorites] = useState<Set<number>>(() => new Set(getFavoritesFromLocalStorage()));

  const toggleFavorites = (id: number): void => {
    setFavorites(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  return (
    <FavoritesContext value={{ favorites, toggleFavorites }}>
      {children}
    </FavoritesContext>
  )
}
