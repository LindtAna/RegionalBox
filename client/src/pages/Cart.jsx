import { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext"
import { assets, dummyAddress } from "../assets/assets"


const Cart = () => {

    // Daten über Produkte, den Warenkorb und Funktionen zum Arbeiten damit
    const { products, actionProducts, currency, cardItems, actionCardItems,
        removeFromCart, getCartCount, getCartAmount, navigate, cartArray,
        getOrder } = useAppContext()

    // Lokale Zustände der Komponente
    const [address, setAddress] = useState(dummyAddress)
    const [showAddress, setShowAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0])
    const [paymentOption, setPaymentOption] = useState('COD')


    const placeOrder = async () => { }

    // Regular und Angebotsprodukte zusammenführen
    const all = [...products, ...actionProducts];

    // Wird aufgerufen, wenn sich Produkte oder Warenkorb ändern
    // Aktualisiert das Warenkorb-Array mit der Anzahl jedes Produkts
    useEffect(() => {
        if (
            [...products, ...actionProducts].length > 0 &&
            (Object.keys(cardItems).length > 0 || Object.keys(actionCardItems).length > 0)
        ) {
            getOrder();
        }
    }, [products, cardItems, actionProducts, actionCardItems]);

    // Wenn Produkte vorhanden sind und der Warenkorb nicht leer ist — Inhalt des Warenkorbs anzeigen
    return all.length > 0 &&
        (Object.keys(cardItems).length > 0 || Object.keys(actionCardItems).length > 0) ? (
        <div className="flex flex-col md:flex-row mt-16">

            {/* Linke Spalte: Liste der Produkte im Warenkorb */}
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-1">
                    Einkaufswagen
                </h1>
                <span className="text-sm text-dark-green">{getCartCount()} Artikeln</span>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3 pt-3">
                    <p className="text-left">Produktdetails</p>
                    <p className="text-center">Zwischensumme</p>
                    <p className="text-center">Löschen</p>
                </div>

                {/* Array der Produkte durchlaufen und jedes Produkt im Warenkorb rendern */}
                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-black items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div
                                onClick={() => {
                                    // nterschiedliche Routen für Regular und Angebotsprodukte
                                    if (product.type === "action") {
                                        navigate(`/deals/${product.category.toLowerCase()}/${product._id}`);
                                    } else {
                                        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                    }
                                    scrollTo(0, 0);
                                }}
                                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-dark-green/20 hover:border-dark-green/80 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                {/*  Name, Volumen und Menge des Produkts */}
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div
                                    className="font-normal text-gray-500/70">
                                    <p>Vol.: <span>{product.volume || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Stückz.: <span>{product.quantity}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Gesamtpreis für das Produkt  */}
                        <p className="text-center">
                            {currency}
                            {((product.type === "action" ? product.offerPrice : product.price) * product.quantity).toFixed(2)}
                        </p>


                        <button
                            onClick={() => removeFromCart(product._id, product.type)}
                            className="cursor-pointer mx-auto"
                        >
                            <img src={assets.remove_icon} alt="Entfernen" />
                        </button>
                    </div>)
                )}


                <button onClick={() => { navigate('/products'); scrollTo(0, 0) }} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    <img className="group-hover:-translate-x-2 transition"
                        src={assets.arrow_right_icon_colored} alt="Arrow" />
                    Weiter einkaufen
                </button>

            </div>

            {/* Block mit Lieferadresse, Auswahl der Zahlungsoption und Bestellsumme  */}
            <div className="max-w-[360px] w-full rounded-lg bg-primary/10 p-5 max-md:mt-16 border border-dark-green/20 self-start">
                <h2 className="text-xl md:text-xl font-medium">Gesamtbetrag</h2>
                <hr className="border-dark-green/20 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Lieferadresse</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-black/80">{selectedAddress ? `${selectedAddress.street},
                        ${selectedAddress.city}, ${selectedAddress.country}` : 'Keine Adresse gefunden'}</p>


                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline hover:text-dark-green cursor-pointer">
                            Ändern
                        </button>

                        {showAddress && (
                            <div className="absolute top-12 py-1 px-8 bg-white rounded-lg border border-dark-green/20 text-sm w-full">
                                {address.map((address, index) => (<p onClick={() => setShowAddress(false)}
                                    className="text-dark-green p-2 hover:bg-gray-100">
                                    {address.street}, {address.city}, 
                                     {address.country},
                                </p>))}
                                <p onClick={() => navigate('/add-address')} className="text-primary text-center cursor-pointer p-2  hover:text-dark-green hover:bg-dark-green/10">
                                    Eine neue Lieferadresse hinzufügen
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Zahlungsoptionen */}
                    <p className="text-sm  font-medium uppercase mt-6">Zahlungsoptionen</p>

                    <select onChange={(e) => setPaymentOption(e.target.value)} className="w-full border rounded-lg border-dark-green/20 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Kontaktlos beim Kurier</option>
                        <option value="Online">Online Zahlung</option>
                    </select>
                </div>
                <hr className="border-dark-green/20" />

                {/* Endsumme der Bestellung */}
                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Verpackung & Versand</span><span className="text-primary">0,00€</span>
                    </p>

                    <p className="flex justify-between text-lg font-medium mt-3 text-black">
                        <span>Gesamtbetrag:</span><span>{currency}{getCartAmount("all")}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary rounded-lg text-white font-medium hover:bg-dark-green transition">
                    {paymentOption === 'COD' ? 'Kostenpflichtig bestellen' : 'Weiter zur Kasse'}
                </button>
            </div>
        </div>
    ) : (
        <div className="flex flex-col justify-between items-start mt-10">
            <p className="text-dark-green text-2xl">Ihr Warenkorb ist leer</p>
            <button onClick={() => { navigate('/products'); scrollTo(0, 0) }} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                <img className="group-hover:-translate-x-2 transition"
                    src={assets.arrow_right_icon_colored} alt="Arrow" />
                Jetzt shoppen
            </button>
        </div>
    )
}

export default Cart