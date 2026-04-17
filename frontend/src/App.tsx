import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import type { CollectionItem } from './types';
import { FavoritesProvider } from './context/FavoritesProvider';

const Collection = lazy(() => import('./components/Collection/Collection').then(m => ({ default: m.Collection })));
const Item = lazy(() => import('./components/Item/Item').then(m => ({ default: m.Item })));
const Wishlist = lazy(() => import('./components/Wishlist/Wishlist').then(m => ({ default: m.Wishlist })));

function App() {

  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);

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


  return (
    <FavoritesProvider>
      <Suspense fallback={<div aria-busy="true">Loading...</div>}>
        <Routes>
          <Route
            path='/'
            element={
              <Collection
                collection={collection}
                loading={loading}
              />
            }>
          </Route>
          <Route
            path='collection'
            element={
              <Collection
                collection={collection}
                loading={loading}
              />
            }>
          </Route>
          <Route
            path='wishlist'
            element={
              <Wishlist
                collection={collection}
              />
            }>
          </Route>
          <Route
            path='collection/:id'
            element={<Item />}>
          </Route>
        </Routes>
      </Suspense>
    </FavoritesProvider>
  )
}

export default App
