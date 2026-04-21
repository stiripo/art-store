import { createContext, useContext } from 'react';
import type { FavoritesContextType } from '../types';


export const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}