import React from 'react'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const NavBar = () => {
const [open, setOpen] = React.useState(false)
const {user, setUser,setShowUserLogin, navigate} = useAppContext()

const logout = async() => {
    setUser(null) ;
    navigate('/')
}
   return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b
         border-dark-green/20 bg-white relative transition-all">

            <NavLink to='/' onClick={() => setOpen(false)}>
                <img className='h-9' src={assets.logo} alt='logo' />
           </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-15 text-xl font-semibold">
                <NavLink to='/' className='hover:text-primary hover:transition-duration:200ms'>Home</NavLink>
                <NavLink to='/products' className='hover:text-primary hover:transition-duration:200ms'>Produkte</NavLink>
                <NavLink to='/contact' className='hover:text-primary hover:transition-duration:200ms'>Kontakt</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-primary-dull/20 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-primary" type="text" placeholder="Suche..." />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.836 10.615 15 14.695" stroke="#1b6b45" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#1b6b45" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.cart_icon} alt='shopping cart' className='w-6 opacity-80'/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-dark-green w-[18px] h-[18px] rounded-full">3</button>
                </div>

                {!user ? (
                    <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dark-green transition text-white rounded-full text-sm">
                    Anmelden
                </button>
                ) : (
                   <div className='relative group'>
                    <img src={assets.profile_icon} className='w-10' alt='profile'/>
                    <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border
                     border-dark-green  py-2.5 w-30 rounded-md text-sm z-40'>
                        <li onClick={() => navigate('orders')} className='p-1.5 hover:bg-primary-dull/10 cursor-pointer'>Einkaufswagen</li>
                        <li onClick={logout} className='p-1.5 hover:bg-primary-dull/10 cursor-pointer'>Abmelden</li>
                    </ul>
                   </div>
                )}
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt='menu'/>
            </button>

            {/* Mobile Menu */}
            { open  && (
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md
            py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
               <NavLink to='/' onClick={() => setOpen(false)}>Home</NavLink>
                <NavLink to='/products'onClick={() => setOpen(false)}>Produkte</NavLink>
                {user &&
                <NavLink to='/orders' onClick={() => setOpen(false)}>Einkaufswagen</NavLink>
                }
                <NavLink to='/contact'onClick={() => setOpen(false)}>Kontakt</NavLink>
                {!user ? (
                    <button onClick={() => {
                        setOpen(false);
                        setShowUserLogin(true)
                    }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dark-green transition text-white rounded-full text-sm">
                    Anmelden
                </button>
                ) : (
                   <button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dark-green transition text-white rounded-full text-sm">
                    Abmelden
                </button> 
                )
                }
            </div>
              )}
        </nav>
    )
}

export default NavBar