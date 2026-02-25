import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/main.scss";
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { SmoothScroll } from './components/layout/SmoothScroll.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
<BrowserRouter>
<SmoothScroll>
    <App />
</SmoothScroll>

</BrowserRouter>
  </StrictMode>,
)
