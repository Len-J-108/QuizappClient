import ShowUserData from "./components/ShowUserData.jsx";
import Navbar from "./Navbar.jsx";
import classes from "./styles/header.module.scss";

const Header = () => {
  return (
    <header className={classes.header}>
      <ShowUserData />
      <Navbar />
    </header>
  );
};

export default Header;
