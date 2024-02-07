import GamePage from "../GamePage.jsx";
import HomePage from "../HomePage.jsx";
import LoginPage from "../LoginPage.jsx";
import RegisterPage from "../RegisterPage.jsx";
import AddQuestion from "../components/AddQuestion.jsx";
import Highscore from "../components/Highscore.jsx";
import Logout from "../components/Logout.jsx";


const routes = [
  {path:"/", element: <HomePage /> , id: 1},
  {path: "/game", element: <GamePage />, id: 2},
  {path: "/highscore", element: <Highscore /> , id: 3},
  {path: "/login", element: <LoginPage />, id: 4},
  {path: "/logout", element: <Logout />, id: 5},
  {path: "/register", element: <RegisterPage />, id: 5},
  {path: "/add-question", element: <AddQuestion />, id: 6},
];

export default routes;