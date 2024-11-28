import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fanta.css'
import App from './App.jsx'
import PokeContextProvider from './context/PokeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PokeContextProvider>
      <App />
    </PokeContextProvider>
  </StrictMode>,
)
