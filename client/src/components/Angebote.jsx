// Section Angebote Der Woche

import ProdCardAction from './ProdCardAction'
import { useAppContext } from '../context/AppContext';

const Angebote = () => {
  const { actionProducts } = useAppContext();
  return (
    <div className='mt-16'>
      <div className='flex justify-between items-center'>
        <p className='text-2xl md:text-3xl font-medium'>Unsere Angebots-Highlights</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
      gap-3 md:gap-6 mt-6'>
        {actionProducts
          .filter(p => p.highlight && p.inStock)
          .slice(0, 6)
          .map((actionProduct, index) => (
            <ProdCardAction key={index} actionProduct={actionProduct} />
          ))}
      </div>
    </div>
  )
}

export default Angebote