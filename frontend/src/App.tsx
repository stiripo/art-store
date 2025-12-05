import './App.css';
import { Collection } from './components/Collection/Collection';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Collection></Collection>
    </BrowserRouter>

  )
}

export default App
