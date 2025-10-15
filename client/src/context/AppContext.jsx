import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { angebote } from "../assets/collections/angeboteList";


//Context for managing user state and navigation.
//Provides information about the current user, their seller role, and navigation functionality.
// Kontext zur Verwaltung des Benutzerzustands und der Navigation
// Enthält Informationen über den aktuellen Benutzer, seine Verkäuferrolle sowie Navigationsfunktionen
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [actionProducts, setActionProducts] = useState([])
    
    const [actionCardItems, setActionCardItems] = useState({})

    //Fetch alle Produkte
    const fetchActionProducts = async () => {
        setActionProducts(angebote)
    }


    // Produkt in den Warenkorb legen
    const addToCart = (itemId) => {
        let actionCartData = structuredClone(actionCardItems);

        if (actionCartData[itemId]) actionCartData[itemId] += 1;
        else actionCartData[itemId] = 1;
        setActionCardItems(actionCartData);
        toast.success('Zum Warenkorb hinzugefügt')
    }

    // Artikelmenge im Warenkorb aktualisieren
    const updateCartItem = (itemId, quantity) => {
        let actionCartData = structuredClone(actionCardItems);
        actionCartData[itemId] = quantity;
        setActionCardItems(actionCartData)
        toast.success('Warenkorb aktualisiert')
    }

    // Produkt aus dem Warenkorb entfernen
    const removeFromCart = (itemId) => {
        let actionCartData = structuredClone(actionCardItems);
        if (actionCartData[itemId]) {
            actionCartData[itemId] -= 1;
            if(actionCartData[itemId] === 0) delete actionCartData[itemId];
        }
        toast.success('Aus dem Warenkorb entfernt')
        setActionCardItems(actionCartData)
    }

    useEffect(() => {
        fetchActionProducts()
    }, [])

    const value = {
        navigate, user, setUser, setIsSeller,
        isSeller, showUserLogin, setShowUserLogin, actionProducts,
        currency, addToCart, updateCartItem, removeFromCart,
        actionCardItems
    }

    return <AppContext.Provider value={value} >
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}