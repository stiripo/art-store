import './App.css';
import { Collection } from './components/Collection/Collection';
import { Item } from './components/Item/Item';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
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
    </BrowserRouter>

  )
}

export default App
