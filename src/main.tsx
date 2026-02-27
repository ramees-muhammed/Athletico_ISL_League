import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/main.scss";
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { SmoothScroll } from './components/layout/SmoothScroll.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
<BrowserRouter>
<SmoothScroll>
    <App />
</SmoothScroll>

</BrowserRouter>
    </QueryClientProvider>

  </StrictMode>,
)
