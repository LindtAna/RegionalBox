import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { angebote } from "../assets/collections/angeboteList";
import { allProducts } from "../assets/collections/productsList";


//Context for managing user state and navigation.
//Provides information about the current user, their seller role, and navigation functionality.
// Kontext zur Verwaltung des Benutzerzustands und der Navigation
// Enthält Informationen über den aktuellen Benutzer, seine Verkäuferrolle sowie Navigationsfunktionen
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)

    const [actionProducts, setActionProducts] = useState([])
    const [actionCardItems, setActionCardItems] = useState({})
    const [products, setProducts] = useState([])
    const [cardItems, setCardItems] = useState({})

    const [searchQuery, setSearchQuery] = useState({})

   //Fetch alle Produkte
  const fetchActionProducts = async () => setActionProducts(angebote);
  const fetchProducts = async () => setProducts(allProducts);

   useEffect(() => {
    fetchActionProducts();
    fetchProducts();
  }, []);


  // Liefert die Warenkorbdaten je nach Produkttyp ("action" oder regulär)
  const getCartData = (type) =>
    type === "action"
      ? structuredClone(actionCardItems)
      : structuredClone(cardItems);

  const setCartData = (type, data) =>
    type === "action" ? setActionCardItems(data) : setCardItems(data);


    // Produkt in den Warenkorb legen
   const addToCart = (itemId, type = "regular") => {
    let cartData = getCartData(type);

    if (cartData[itemId]) cartData[itemId] += 1;
    else cartData[itemId] = 1;

    setCartData(type, cartData);
    toast.success("Zum Warenkorb hinzugefügt");
  };


    // Artikelmenge im Warenkorb aktualisieren
    const updateCartItem = (itemId, quantity, type = "regular") => {
    let cartData = getCartData(type);
    cartData[itemId] = quantity;
    setCartData(type, cartData);
    toast.success("Warenkorb aktualisiert");
  };

    // Produkt aus dem Warenkorb entfernen
    const removeFromCart = (itemId, type = "regular") => {
    let cartData = getCartData(type);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId];
    }

    setCartData(type, cartData);
    toast.success("Aus dem Warenkorb entfernt");
  };

    const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    currency,
    searchQuery,
    setSearchQuery,

    products,
    setProducts,
    actionProducts,
    setActionProducts,
    currency,

    cardItems,
    setCardItems,
    actionCardItems,
    setActionCardItems,

    addToCart,
    updateCartItem,
    removeFromCart,
    }

    return <AppContext.Provider value={value} >
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}