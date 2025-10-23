import NavBar from './components/NavBar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import LoginForm from './components/LoginForm'
import AllProducts from './pages/AllProducts'
import Angebote from './pages/Angebote'
import CategoryProducts from './pages/CategoryProducts'
import ActionProductDetails from './pages/ActionProductDetails'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import Orders from './pages/Orders'
import SellerLogin from './components/seller/SellerLogin'

const App = () => {

  const isSellerPath = useLocation().pathname.includes('seller');
  const {showUserLogin, isSeller} = useAppContext()

  return (
    <div>
        {isSellerPath ? null : <NavBar/> }
        {showUserLogin ? <LoginForm/> : null}
        <Toaster />
        <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
          <Routes>
            <Route  path='/' element={<Home/>}/>
            <Route  path='/products' element={<AllProducts/>}/>
            <Route  path='/deals' element={<Angebote/>}/>
            <Route  path='/products/:category' element={<CategoryProducts/>}/>
            <Route  path='/deals/:category' element={<CategoryProducts/>}/>
            <Route  path='/products/:category/:id' element={<ProductDetails />}/>
            <Route  path='/deals/:category/:id' element={<ActionProductDetails />}/>
            <Route  path='/cart' element={<Cart/>}/>
            <Route  path='/add-address' element={<AddAddress/>}/>
            <Route  path='/orders' element={<Orders/>}/>
            <Route path='/seller' element={isSeller ? null : <SellerLogin/>}></Route>
          </Routes>
        </div>
       {!isSellerPath && <Footer />}
    </div>
  )
}

export default App