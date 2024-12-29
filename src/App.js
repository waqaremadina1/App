import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle';

import Routes from './pages/Routes';
import { useAuthContext } from './context/AuthContext';
import ScreenLoader from './components/ScreenLoader';

function App() {

  const { isAppLoader } = useAuthContext()


  return (

    <>
      {!isAppLoader ? <Routes /> : <ScreenLoader />}

    </>
  );
}

export default App;
