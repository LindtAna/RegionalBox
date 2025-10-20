import { useEffect, useState } from "react";
import { useAppContext } from '../context/AppContext';
import { Link, useParams } from "react-router-dom";
import { categories } from "../assets/collections/categoriesList";
import ProdCardAction from "../components/ProdCardAction";

const ActionProductDetails = () => {

    const { actionProducts, navigate, currency, addToCart } = useAppContext()

    const { id } = useParams()

    const [relatedActionProducts, setRelatedActionProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const actionProduct = actionProducts.find((item) => item._id === id);

    const categoryData = categories.find(
        (cat) => cat.text.toLowerCase() === actionProduct?.category.toLowerCase()
    );
    useEffect(() => {
        if (actionProducts.length > 0) {
            let actionProductsCopy = actionProducts.slice();
            actionProductsCopy = actionProductsCopy
                .filter((item) => actionProduct.category === item.category)
            setRelatedActionProducts(actionProductsCopy.slice(0, 5))
        }
    }, [actionProducts])

    useEffect(() => {
        setThumbnail(actionProduct?.image[0] ? actionProduct.image[0] : null)
    }, [actionProduct])


    return actionProduct && (
        <div className="mt-12">
            <p>
                <Link to={'/'}>Home</Link> /
                <Link to={'/deals'}>Angebote</Link> /
                <Link
                    to={`/deals/${categoryData?.path.toLowerCase() || ''}`}
                    onClick={() => scrollTo(0, 0)}
                >
                    {actionProduct.category}
                </Link> /
                <span className="text-emerald-600"> {actionProduct.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {actionProduct.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)}
                                className="border max-w-24 border-dark-green/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-dark-green/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{actionProduct.name}</h1>

                    <div className="mt-6">
                        <p className="text-dark-green line-through">{currency}{actionProduct.price}</p>
                        <p className="text-2xl font-medium text-primary">{currency}{actionProduct.offerPrice}</p>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-dark-green">
                        {actionProduct.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="max-w-72 flex flex-col items-start mt-10 gap-4 text-base">
                        <button onClick={() => {addToCart(actionProduct._id)}} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-dark-green transition rounded-full" >
                            In den Einkaufswagen
                        </button>
                        <button onClick={() => { addToCart(actionProduct._id); navigate('/cart') }}
                            className="w-full py-3.5 cursor-pointer font-medium bg-emerald-600 text-white hover:bg-dark-green transition rounded-full" >
                            Jetzt kaufen
                        </button>
                    </div>
                </div>
            </div>

             {/* Related Products */}
            <div className="flex flex-col items-center mt-10">
                <div className="flex flex-col items-center w-max">
                    <p className="text-2xl font-medium">Related Products</p>
                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
                gap-3 md:gap-6 mt-3 w-full">
                    {relatedActionProducts.filter((actionProduct) => actionProduct.inStock)
                        .map((actionProduct, index) => (
                            <ProdCardAction
                                key={index}
                                actionProduct={actionProduct}
                            />
                        ))}
                </div>
<button onClick={() => {navigate('/products'); scrollTo(0,0)}}
className="mx-auto cursor-pointer px-12 my-4 py-2.5 border rounded-full bg-primary
text-white hover:bg-dark-green transition"
>See More</button>
            </div>
        </div>
    );
};

export default ActionProductDetails