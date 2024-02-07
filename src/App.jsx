import {  Route, Routes } from "react-router-dom";
import { GameContextProvider } from "./context/GameContext.jsx";
import Layout from "./Layout.jsx";
import routes from "./routes/routes.jsx";
// import './styles/main.css';



function App() {

  return (
      <GameContextProvider>
        <Layout>
          <Routes>
            {routes.map((route) => (
              <Route key={route.id} {...route} />
              ))}
            </Routes>
        </Layout>
      </GameContextProvider>
  );
}

export default App;
