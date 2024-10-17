import { PrimeReactProvider } from 'primereact/api';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import SideBarMenu from './components/SideBarMenu/SideBarMenu';
import TopBarMenu from './components/TopBarMenu/TopBarMenu';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';

export default function App() {
  return (
  <PrimeReactProvider>
        <Router>
    <TopBarMenu />
      <div className='w-full h-screen inline-flex'>
        <SideBarMenu />
        <div className='w-full mt-2 ml-3'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
          </Routes> 
        </div>
      </div>  
  </Router>
  </PrimeReactProvider>
  
 );
}
