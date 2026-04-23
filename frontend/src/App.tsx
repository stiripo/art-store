import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { FavoritesProvider } from './context/FavoritesProvider';
import { CollectionProvider } from './context/CollectionProvider';

const Collection = lazy(() => import('./components/Collection/Collection').then(m => ({ default: m.Collection })));
const Item = lazy(() => import('./components/Item/Item').then(m => ({ default: m.Item })));
const Wishlist = lazy(() => import('./components/Wishlist/Wishlist').then(m => ({ default: m.Wishlist })));

function App() {

  return (
    <CollectionProvider>
      <FavoritesProvider>
        <Suspense fallback={<div aria-busy="true">Loading...</div>}>
          <Routes>
            <Route path='/' element={<Collection />} />
            <Route path='collection' element={<Collection />} />
            <Route path='wishlist' element={<Wishlist />} />
            <Route path='collection/:id' element={<Item />} />
          </Routes>
        </Suspense>
      </FavoritesProvider>
    </CollectionProvider>
  )
}

export default App
