import ShowUserData from "./components/ShowUserData.jsx";
import Navbar from "./Navbar.jsx";
import cl from "./styles/header.module.scss";

const Header = () => {
  return (
    <header className={cl.header}>
      {/* <div> */}
      <ShowUserData />
      {/* </div> */}
      <Navbar />
    </header>
  );
};

export default Header;
