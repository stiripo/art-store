import './App.css';
import { Collection } from './components/Collection/Collection';
import { Item } from './components/Item/Item';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
     <Routes>
      <Route
        path='/'
        element={<Collection />}>
      </Route>
      <Route
        path='collection'
        element={<Collection />}>
      </Route>
      <Route
        path='collection/:id'
        element={<Item />}>
      </Route>
    </Routes>
  )
}

export default App
