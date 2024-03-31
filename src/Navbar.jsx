import {useContext} from 'react';
import { NavLink } from "react-router-dom";
import classes from './styles/nav.module.scss';
import GameContext from './context/GameContext.jsx';
import Button from '@mui/material/Button';


const links = [
  {name: 'Login', to: '/login', showOn: 'loggedOut', id: 1 },
  {name: 'Register', to: '/register', showOn: 'loggedOut', id: 2 },
  {name: 'Game', to: '/game', showOn: 'loggedIn', id: 3 },
  {name: 'Highscore', to: '/highscore', showOn: 'always', id: 4 },
  {name: 'Logout', to: '/logout', showOn: 'loggedIn', id: 5 },
];

const Navbar = () => {
  const { isLoggedIn, userData } = useContext(GameContext);

  if (isLoggedIn){
    return (
      <nav>
      <ul className={classes.list}>
        {links.map((link) => {
            if(link.showOn === 'loggedIn' || link.showOn === 'always'){
              return (
                <NavLink 
                  key={link.id}
                  to={link.to}
                  style={({isActive}) => {
                    return {
                      borderBottom: isActive ? '2px solid red' : '',
                      padding: isActive ? '0 0 7px 0' : '',
                      }
                    }}>
                    <Button className={classes.btn} variant="outlined" sx={{color: 'white', borderColor: 'white', fontSize: '1.5rem'}}>{link.name}</Button>
                </NavLink>
              )
            }
          })}
                {   userData.role === 'admin' && <NavLink 
                  to={"/add-question"}
                  style={({isActive}) => {
                    return {
                      borderBottom: isActive ? '2px solid red' : '',
                      padding: isActive ? '0 0 7px 0' : '',
                      }
                    }}>
                    <Button className={classes.btn} variant="outlined" sx={{color: 'white', borderColor: 'white',}}>add-quests</Button>
                </NavLink>}
      </ul>
    </nav>
    )
  }

  if (!isLoggedIn){
    return (
      <nav>
      <ul className={classes.list}>
        {links.map((link) => {
          if(link.showOn === 'loggedOut' || link.showOn === 'always'){
            return (
              <NavLink 
                key={link.id}
                to={link.to}
                style={({isActive}) => {
                  return {
                    borderBottom: isActive ? '2px solid red' : '',
                    padding: isActive ? '0 0 7px 0' : '',
                    }
                  }}>
                  <Button className={classes.btn} variant="outlined" sx={{color: 'white', borderColor: 'white',}}>{link.name}</Button>
              </NavLink>
            )
          }
        })}
      </ul>
    </nav>
    )
  }


};

export default Navbar;
