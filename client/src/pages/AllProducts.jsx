

import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import ProdCardAction from '../components/ProdCardAction';

const AllProducts = () => {

    // Filtert alle Produkte (regulär und Angebote) basierend auf searchQuery
    // speichert die gefilterten Ergebnisse in filteredProducts
    
    const { products, actionProducts, searchQuery } = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
  const all = [...products, ...actionProducts ];

  if (searchQuery && searchQuery.length > 0) {
    const lower = searchQuery.toLowerCase();
    setFilteredProducts(
      all.filter(product => product.name.toLowerCase().includes(lower))
    );
  } else {
    setFilteredProducts(all);
  }
}, [products, actionProducts, searchQuery]);

    return (
        <div className='mt-16 flex flex-col'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium uppercase'>Alle Produkte</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'>
                </div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3
            md:gap-6 mt-6'>

                {filteredProducts.filter((product) => product.inStock)
                    .map((product, index) => 
            product.offerPrice ? (
              <ProdCardAction key={index} actionProduct={product} />
            ) : (
              <ProductCard key={index} product={product} />
            )
          )}
            </div>
        </div>
    )
}

export default AllProducts