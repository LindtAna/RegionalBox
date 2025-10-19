import { useEffect, useState } from 'react' 
import { useAppContext } from '../context/AppContext' 
import ProdCardAction from '../components/ProdCardAction' 


const Angebote = () => {

// Filtert die Aktionsprodukte basierend auf searchQuery
// speichert die gefilterten Ergebnisse in filteredProducts

const { actionProducts, searchQuery } = useAppContext() 
const [filteredProducts, setFilteredProducts] = useState([]) 

useEffect(() => { if (searchQuery.length > 0) { 
    setFilteredProducts(actionProducts.filter(actionProduct => 
        actionProduct.name.toLowerCase()
        .includes(searchQuery.toLowerCase())))
    } else { setFilteredProducts(actionProducts) } 
}, [actionProducts, searchQuery]) 

return (<div className='mt-16 flex flex-col'> 
<div className='flex flex-col items-end w-max'> 
    <p className='text-2xl font-medium uppercase'>Angebote</p> 
    <div className='w-16 h-0.5 bg-primary rounded-full'> 
        </div> 
        </div> 
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
        lg:grid-cols-5 gap-3 md:gap-6 mt-6'> 
            {filteredProducts.filter((actionProduct) => 
            actionProduct.inStock).map((actionProduct, index) => (
            <ProdCardAction key={index} actionProduct={actionProduct} />
        ))} 
        </div> 
        </div>
        )
    } 
        
export default Angebote