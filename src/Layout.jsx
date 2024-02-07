import Header from "./Header"
import {Toaster} from 'react-hot-toast';
import cl from "./styles/layout.module.scss";

const Layout = ({children}) => {
  return ( 
    <div className={cl.layout}>
      <Toaster 
        toastOptions={{
          style: {
          border: '3px solid lightgray',
          padding: '1rem',
          backgroundColor: '#d6d3d1',
          }
        }}
      />
      <Header />
      <div className={cl.childrensWrapper}>
        {children}
      </div>
    </div>
  )
}

export default Layout