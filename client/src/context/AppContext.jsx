import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { angebote } from "../assets/collections/angeboteList";
import { allProducts } from "../assets/collections/productsList";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

//Context for managing user state and navigation.
//Provides information about the current user, their seller role, and navigation functionality.
// Kontext zur Verwaltung des Benutzerzustands und der Navigation
// Enthält Informationen über den aktuellen Benutzer, seine Verkäuferrolle sowie Navigationsfunktionen

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(false)
  const [isSeller, setIsSeller] = useState(false)
  const [showUserLogin, setShowUserLogin] = useState(false)

  const [actionProducts, setActionProducts] = useState([])
  const [actionCartItems, setActionCartItems] = useState({})
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState({})

  const [searchQuery, setSearchQuery] = useState("")

  const [cartArray, setCartArray] = useState([])

  //Fetch Verkaufer Status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get('/api/seller/is-auth')
      if (data.success) setIsSeller(true)
      else setIsSeller(false)
    } catch (error) {
      setIsSeller(false)
    }
  }


  //Fetch alle Produkte
  const fetchActionProducts = async () => setActionProducts(angebote);

  // const fetchProducts = async () => setProducts(allProducts);
  const fetchProducts = async () => {
    try{
      const{data} = await axios.get('/api/product/list')
      if(data.success){
        setProducts(data.products)
      }else toast.error(data.message)
    }catch(error) { toast.error(error.message) }
  }

  useEffect(() => {
    fetchActionProducts();
    fetchProducts();
    fetchSeller();
  }, []);


  // Liefert die Warenkorbdaten je nach Produkttyp ("action" oder regulär)
  const getCartData = (type) =>
    type === "action"
      ? structuredClone(actionCartItems)
      : structuredClone(cartItems);

  const setCartData = (type, data) =>
    type === "action" ? setActionCartItems(data) : setCartItems(data);


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



  // Warenkorb-Zähler für hinzugefügte Produkte
  // Preis je nach Produkttyp erhalten
  const getItemPrice = (product, type) =>
    type === "action" ? product.offerPrice : product.price;


  // Berechnung der Anzahl der Produkte
  const getCartCount = (type = "all") => {
    let totalCount = 0;

    // Wenn alles auf einmal gezählt werden soll (sowohl Aktions- als auch reguläre Produkte)
    if (type === "all" || type === "regular") {
      for (const item in cartItems) totalCount += cartItems[item];
    }
    if (type === "all" || type === "action") {
      for (const item in actionCartItems) totalCount += actionCartItems[item];
    }

    return totalCount;
  };


  // Berechnung des Gesamtbetrags
  const getCartAmount = (type = "all") => {
    let totalAmount = 0;

    const addAmount = (items, productList, priceKey) => {
      for (const id in items) {
        const product = productList.find((p) => p._id == id);
        if (product && items[id] > 0) {
          totalAmount += getItemPrice(product, priceKey) * items[id];
        }
      }
    };

    if (type === "all" || type === "regular") {
      addAmount(cartItems, products, "regular");
    }
    if (type === "all" || type === "action") {
      addAmount(actionCartItems, actionProducts, "action");
    }

    return Math.floor(totalAmount * 100) / 100;
  };


  // Zählt die Artikel im Einkaufswagen

  const getOrder = () => {
    let tempArray = [];

    // Hilfsfunktion zum Hinzufügen von Artikeln zu tempArray
    const addItemsToArray = (items, productList, type) => {
      for (const key in items) {
        const product = productList.find((item) => item._id === key);
        if (product) {
          const productCopy = { ...product, quantity: items[key], type };
          tempArray.push(productCopy);
        }
      }
    };


    addItemsToArray(cartItems, products, "regular");
    addItemsToArray(actionCartItems, actionProducts, "action");

    setCartArray(tempArray);
  };



  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    searchQuery,
    setSearchQuery,

    products,
    setProducts,
    actionProducts,
    setActionProducts,
    currency,

    cartItems,
    setCartItems,
    actionCartItems,
    setActionCartItems,
    cartArray,
    setCartArray,

    addToCart,
    updateCartItem,
    removeFromCart,
    getCartCount,
    getCartAmount,
    getOrder,

    axios,
    fetchProducts,
  }

  return <AppContext.Provider value={value} >
    {children}
  </AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext)
}