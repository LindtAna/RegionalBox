import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ActionProductsList = () => {

    const { actionProducts, currency, axios, fetchActionProducts } = useAppContext()


    const toggleStock = async (id, inStock) => {
        try {
            const { data } = await axios.patch('/api/action-product/stock', { id, inStock })
            if (data.success) {
                fetchActionProducts();
                toast.success(data.message)
            } else toast.error(data.message)
        } catch (error) { toast.error(error.message) }
    }

    const toggleHighlight = async (id, currentValue) => {
        try {
            const { data } = await axios.patch('/api/action-product/highlight', {
                id,
                highlight: !currentValue
            });
            if (data.success) {
                toast.success(data.message);
                fetchActionProducts();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div className="flex-1 flex flex-col justify-between h-[95vh] overflow-y-scroll no-scrollbar">
            <div className="w-full md:p-10 p-4">
                <h2 className="pb-4 text-lg font-medium">Alle Angebote</h2>
                <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-dark-green/40">
                    <table className="md:table-auto table-fixed w-full overflow-hidden">
                        <thead className="text-dark-green text-sm text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold truncate">Produktname</th>
                                <th className="px-4 py-3 font-semibold truncate hidden md:block">Kategorie</th>
                                <th className="px-4 py-3 font-semibold truncate">Preis</th>
                                <th className="px-4 py-3 font-semibold truncate">Angebotspreis</th>
                                <th className="px-4 py-3 font-semibold truncate">Highlight</th>
                                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-black">
                            {actionProducts.map((product) => (
                                <tr key={product._id} className="border-t border-dark-green/40">
                                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                        <div className="border border-dark-green/40 rounded overflow-hidden">
                                            <img src={product.image[0]} alt="Product" className="w-16" />
                                        </div>
                                        <span className="truncate max-sm:hidden w-full">{product.name}</span>
                                    </td>
                                    <td className="px-4 py-3 max-sm:hidden">{product.category}</td>
                                    <td className="px-4 py-3">{currency}{product.price}</td>
                                    <td className="px-4 py-3">{currency}{product.offerPrice || '0'}</td>

                                    <td className="px-4 py-3">
                                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                            <input
                                                onClick={() => toggleHighlight(product._id, product.highlight)}
                                                checked={product.highlight}
                                                type="checkbox"
                                                className="sr-only peer"
                                            />
                                            <div className="w-12 h-7 bg-primary/20 border border-dark-green/40
                                            rounded-full peer peer-checked:bg-dark-green transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-5 h-5 bg-white border border-dark-green/40 rounded-full transition-transform
                                            duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                        </label>
                                    </td>

                                    <td className="px-4 py-3">
                                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                            <input
                                                onClick={() => toggleStock(product._id, !product.inStock)}
                                                checked={product.inStock}
                                                type="checkbox" className="sr-only peer" />
                                            <div className="w-12 h-7 bg-primary/20 border border-dark-green/40
                                            rounded-full peer peer-checked:bg-dark-green transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-5 h-5 bg-white 
                                            border border-dark-green/40 rounded-full transition-transform
                                            duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ActionProductsList