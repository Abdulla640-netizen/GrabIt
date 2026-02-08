import './Layout.css'
import Header from "../Header/Header/";
import Footer from "../Footer/Footer";
import { Outlet } from 'react-router-dom';

function Layout(){
  return(
    <div>
        <Header></Header>
        <Outlet/>
        <Footer></Footer>
    </div>
  ) 

}
export default Layout