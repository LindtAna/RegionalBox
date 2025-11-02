import { useState } from 'react'
import { assets } from '../../assets/assets';
import { categories } from '../../assets/categories/categoriesList';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

export const AddProduct = () => {
    const { axios } = useAppContext()
    const [files, setFiles] = useState([])
    const [productType, setProductType] = useState('Standart')
    const [name, setName] = useState('')
    const [volume, setVolume] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')

    const resetForm = () => {
        setFiles([]);
        setProductType('Standart');
        setName('');
        setVolume('');
        setDescription('');
        setCategory('');
        setPrice('');
        setOfferPrice('');
    }

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault()

            if (productType === 'Standart') {
                const productData = {
                    name,
                    volume,
                    description: description.split('\n'),
                    category,
                    price,
                }
            
                const formData = new FormData();
                formData.append('productData', JSON.stringify(productData));
                for (let i = 0; i < files.length; i++) {
                    formData.append('images', files[i])
                }

                const { data } = await axios.post('/api/product/add', formData)
                if (data.success) {
                    toast.success(data.message)
                    resetForm();
                } else { toast.error(data.message) }


            } else {
                const actionProductData = {
                    name,
                    volume,
                    description: description.split('\n'),
                    category,
                    price,
                    offerPrice,
                }

                const formData = new FormData();
                formData.append('actionProductData', JSON.stringify(actionProductData));
                for (let i = 0; i < files.length; i++) {
                    if (files[i]) formData.append('images', files[i])
                }

                const { data } = await axios.post('/api/action-product/add', formData)
                if (data.success) {
                    toast.success(data.message)
                    resetForm();
                } else { toast.error(data.message) }
            }
        } catch (error) { toast.error(error.message) }
    }


     return (
        <div className="flex flex-col flex-1 h-[120vh] overflow-y-scroll justify-between no-scrollbar">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-1 space-y-3 max-w-lg">
                <div>
                    <div className="mt-1 max-w-[45%]">
                        <select
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                            className="outline-none md:py-2.5 py-2 px-10 rounded border border-dark-green/40"
                        >
                            <option value="Standart">Standart</option>
                            <option value="Angebot">Angebot</option>
                        </select>
                    </div>
                </div>


                <div>
                    <p className="text-base font-medium">Produktbild</p>
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input onChange={(e) => {
                                    const updatedFiles = [...files];
                                    updatedFiles[index] = e.target.files[0]
                                    setFiles(updatedFiles)
                                }}
                                    type="file" id={`image${index}`} hidden />
                                <img className="max-w-50 cursor-pointer"
                                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                                    alt="uploadArea" width={150} height={150} />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Produktname</label>
                    <input
                        onChange={(e) => setName(e.target.value)} value={name}
                        id="product-name" type="text"
                        placeholder="Hier eingeben"
                        className="outline-none md:py-2.5 py-2 px-3 
                    rounded border border-dark-green/40" required />
                </div>

                <div className="flex flex-col gap-1 max-w-[45%]">
                    <label className="text-base font-medium" htmlFor="product-volume">Vol.</label>
                    <input
                        onChange={(e) => setVolume(e.target.value)} value={volume}
                        id="product-volume" type="text"
                        placeholder="z. B. 250 ml / 1 kg"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-dark-green/40" required />
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium"
                        htmlFor="product-description">Produktbeschreibung</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description}
                        id="product-description" rows={4}
                        className="outline-none md:py-2.5 py-2 px-3 
                     rounded border border-dark-green/40 resize-none"
                        placeholder="Hier eingeben"></textarea>
                </div>

                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium"
                        htmlFor="category">Kategorie</label>

                    <select onChange={(e) => setCategory(e.target.value)} value={category}
                        id="category"
                        className="outline-none md:py-2.5 py-2 
                    px-3 rounded border border-dark-green/40">
                        <option value="">Kategorie auswählen</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.path}>
                                {item.path}
                            </option>
                        ))}

                    </select>
                </div>

                <div className="flex flex-wrap sm:gap-10 gap-3 w-full max-w-md mb-8">
                    <div className="flex-1 flex flex-col gap-1 max-w-[45%]">
                        <label className="text-base font-medium" htmlFor="product-price">Produktpreis</label>
                        <input onChange={(e) => setPrice(e.target.value)} value={price}
                            id="product-price"
                            type="text"
                            placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 
                        rounded border border-dark-green/40" required />
                    </div>

                    {productType === 'Angebot' && (
                        <div className="flex-1 flex flex-col gap-1 max-w-[45%]">
                            <label className="text-base font-medium" htmlFor="offer-price">Angebotspreis</label>
                            <input onChange={(e) => setOfferPrice(e.target.value)} value={offerPrice}
                                id="offer-price"
                                type="text" placeholder="0"
                                className="outline-none md:py-2.5 py-2 px-3 rounded 
                            border border-dark-green/40" required />
                        </div>
                    )}
                </div>

                <button className="px-8 py-2.5 bg-primary hover:bg-dark-green
                 text-white font-medium rounded-lg cursor-pointer">Hinzufügen</button>
            </form>
        </div>
    );
};

export default AddProduct