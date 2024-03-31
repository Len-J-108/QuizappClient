import {  Route, Routes } from "react-router-dom";
import { GameContextProvider } from "./context/GameContext.jsx";
import Layout from "./Layout.jsx";
import routes from "./routes/routes.jsx";
import {ErrorBoundary} from 'react-error-boundary';
import ErrorPage from './components/ErrorPage.jsx';
import './styles/main.css';


function App() {

  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}>
      <GameContextProvider>
        <Layout>
          <Routes>
            {routes.map((route) => (
              <Route key={route.id} {...route} />
              ))}
            </Routes>
        </Layout>
      </GameContextProvider>
    </ErrorBoundary>
  );
}

export default App;
