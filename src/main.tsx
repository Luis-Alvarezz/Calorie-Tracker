import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ActivityProvider } from './context/ActivityContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ActivityProvider>
      <App />
    </ActivityProvider>
  </StrictMode>,
)

{/* <ActivityProvider> // * De esa forma los datos que vayamos teniendo en el **ActivityContext y ActivityProvider** van a estar disponibles en toda la aplicación. */}