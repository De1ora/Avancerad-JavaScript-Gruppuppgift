import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from "./App.jsx";
import { Grommet } from 'grommet'

{/* För Grommet */}
const theme = {
  global: {
    font: {
      family: 'Helvetica',
      size: '18px',
      height: '20px',
    },
  },
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Grommet theme={theme} full>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Grommet>
  </StrictMode>
)
