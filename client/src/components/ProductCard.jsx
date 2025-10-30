//Karte eines Produkts. Abhängigkeit: productsList.js

import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({product}) => {

const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext()

    return product && (
        <div onClick={() => {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}} 
        className="border border-dark-green/20 rounded-md md:px-4 px-3 py-2
         bg-white max-w-56 w-full hover:border-dark-green/60 transition">

            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" 
                src={product.image[0]} alt={product.name} />
            </div>

            <div className="text-dark-green/70 text-sm pt-2">
                <p>{product.category}</p>

                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>

                <div className="flex items-center gap-0.5">
                   <p className="text-gray-700">{product.volume}</p>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div className="flex flex-col leading-tight">
                    <p className="md:text-xl text-base font-medium text-green-500">
                      {currency}{product.price}</p>
                    </div>

                    <div  onClick={(e) => {e.stopPropagation()}} className="text-dark-green flex-shrink-0">
                        {!cartItems[product._id] ? (
                            <button className="flex items-center justify-center gap-1 sm:gap-3 bg-emerald-200/60
                            border border-emerald-200 w-[64px]
                            sm:w-[80px] h-[34px] rounded cursor-pointer"
                            onClick={() => addToCart(product._id)} >
                              <img src={assets.cart_icon_s}/>
                              <img src={assets.plus_icon}/>
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px]
                            bg-primary/25 rounded select-none">
                                <button onClick={() => {removeFromCart(product._id)}} 
                                className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => {addToCart(product._id)}}
                                 className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard