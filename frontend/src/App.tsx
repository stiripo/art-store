import './App.css';
import { Collection } from './components/Collection/Collection';
import { Item } from './components/Item/Item';
import { Wishlist } from './components/Wishlist/Wishlist';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { getFavoritesFromLocalStorage } from "./utils";
import { useState, useEffect } from 'react';
import type { CollectionItem } from './types';

function App() {

    const [collection, setCollection] = useState<CollectionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState<Set<number>>(() => new Set(getFavoritesFromLocalStorage()));

  const handleFavorites = (id: number): void => {
    setFavorites(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  }

   const fetchCollection = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:8080/collection');
            if (!response.ok) {
                throw new Error('Error fetching data')
            }
            const data = await response.json() as CollectionItem[];
            setCollection(data);
        }
        catch (error) {
            console.error(error);
            console.log('Error fetching data')
        }
        finally {
            setLoading(false);
        }
    }

  useEffect(() => {
        fetchCollection();
    }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
  }, [favorites]);


  return (
    <Routes>
      <Route
        path='/'
        element={
          <Collection
            collection={collection}
            favorites={favorites}
            toggleFavorites={handleFavorites}
            loading={loading}
          />
        }>
      </Route>
      <Route
        path='collection'
        element={
          <Collection
            collection={collection}
            favorites={favorites}
            toggleFavorites={handleFavorites}
            loading={loading}
          />
        }>
      </Route>
      <Route
        path='wishlist'
        element={
          <Wishlist
            collection={collection}
            favorites={favorites}
          />
        }>
      </Route>
      <Route
        path='collection/:id'
        element={<Item />}>
      </Route>
    </Routes>
  )
}

export default App
