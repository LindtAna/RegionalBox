import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const SellerLayout = () => {

     const { isSeller, setIsSeller, navigate } = useAppContext()

    const sidebarLinks = [
        { name: "Produkt hunzufügen", path: "/seller", icon: assets.add_icon },
        { name: "Produktliste", path: "/seller/products-list", icon: assets.product_list_icon},
        { name: "Bestellungen", path: "/seller/orders-list", icon: assets.order_icon },
    ];

    const logout = async () => {
        setIsSeller(false)
    }

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8
             border-b border-dark-green/30 py-3 bg-white">
                <Link to='/'>
                    <img src={assets.logo} alt="Regional Box Logo" 
                    className="w-34 md:w-38 cursor-pointer"/>
                </Link>
                <div className="flex items-center gap-2 text-primary">
                    <p>Hallo Boss!</p>
                    <button onClick={logout} className='border bg-primary hover:bg-dark-green rounded-full text-base text-white mx-5 px-5 py-1'>Logout</button>
                </div>
            </div>
            <div className="flex">
            <div className="md:w-64 w-16 border-r  text-base border-dark-green/30 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item) => (
                    <NavLink to={item.path} key={item.name} end={item.path === '/seller'}
                        className={({isActive}) => `flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] md:border-r-primary bg-dark-green/10 border-dark-green/20 text-primary"
                                : "hover:bg-primary/10 border-white "
                            }`
                        }
                    >
                        <img src={item.icon} className="w-7 h-7"/>
                        <p className="md:block hidden text-center">{item.name}</p>
                  </NavLink>
                ))}
            </div>
            <Outlet />
            </div>

        </>
    );
};

export default SellerLayout