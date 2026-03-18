import './App.css';
import { Collection } from './components/Collection/Collection';
import { Item } from './components/Item/Item';
import { Wishlist } from './components/Wishlist/Wishlist';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { getFavoritesFromLocalStorage } from "./utils";
import { useState, useEffect } from 'react';

function App() {

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

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
  }, [favorites]);


  return (
    <Routes>
      <Route
        path='/'
        element={
          <Collection
            favorites={favorites}
            toggleFavorites={handleFavorites}
          />
        }>
      </Route>
      <Route
        path='collection'
        element={
          <Collection
            favorites={favorites}
            toggleFavorites={handleFavorites}
          />
        }>
      </Route>
      <Route
        path='wishlist'
        element={
          <Wishlist
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
