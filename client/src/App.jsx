import Router from '@/pages/router.jsx';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './store/app.context.jsx';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AppContextProvider>
  )
}

export default App
