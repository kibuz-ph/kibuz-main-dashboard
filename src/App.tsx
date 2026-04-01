import { RouterProvider } from 'react-router-dom'
import router from './shared/presentation/router'
import { useBrandTheme } from './shared/application/hooks/useBrandTheme';
import { usePersistActiveComplex } from './shared/application/hooks/usePersistActiveComplex';
import './App.css'

const App = () => {
  useBrandTheme();
  usePersistActiveComplex();

  return (
    <RouterProvider router={router} />
  )
}

export default App
