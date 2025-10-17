//Karte eines rabattierten Produkts. Abhängigkeit: angeboteList.js

import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const ProdCardAction = ({actionProduct}) => {

    const {currency, addToCart, removeFromCart, actionCardItems, navigate} = useAppContext()

    return actionProduct && (
        <div className="border border-dark-green/20 rounded-md md:px-4 px-3 py-2
         bg-white max-w-56 w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" 
                src={actionProduct.image[0]} alt={actionProduct.name} />
            </div>
            <div className="text-dark-green/70 text-sm pt-2">
                <p>{actionProduct.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{actionProduct.name}</p>
                <div className="flex items-center gap-0.5">
                   <p className="text-gray-700">{actionProduct.volume}</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-green-500">
                      {currency}{actionProduct.offerPrice}{' '}<span className="text-gray-500/60 md:text-sm 
                      text-xs line-through">
                        {currency}{actionProduct.price}</span> 
                    </p>
                    <div  onClick={(e) => {e.stopPropagation()}} className="text-dark-green">
                        {!actionCardItems[actionProduct._id] ? (
                            <button className="flex items-center justify-center gap-1 bg-emerald-200/60
                            border border-emerald-200 md:w-[80px]
                            w-[64px] h-[34px] rounded cursor-pointer"
                            onClick={() => addToCart(actionProduct._id)} >
                              <img src={assets.cart_icon_s}/>  <img src={assets.plus_icon}/>
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 
                            rounded select-none">
                                <button onClick={() => {removeFromCart(actionProduct._id)}} 
                                className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{actionCardItems[actionProduct._id]}</span>
                                <button onClick={() => {addToCart(actionProduct._id)}}
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

export default ProdCardAction