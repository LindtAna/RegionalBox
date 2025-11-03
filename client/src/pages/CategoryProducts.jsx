import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { categories } from '../assets/categories/categoriesList'
import ProductCard from '../components/ProductCard'
import ProdCardAction from '../components/ProdCardAction'

const CategoryProducts = () => {
  const { products, actionProducts } = useAppContext()
  const { category } = useParams()


  // console.log("useParams category:", category);
  // console.log("products from context:", products);
  // console.log("actionProducts from context:", actionProducts);

  // Suche nach Kategorie
 const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category.toLowerCase()
  );


  // Filterung
 const filteredActionProducts = actionProducts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  const filteredRegularProducts = products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  // Zusammenführen in ein Array für Rendering
  const allFilteredProducts = [
    ...filteredActionProducts.map((actionProduct) => ({
      ...actionProduct,
      type: 'action'
    })),
    ...filteredRegularProducts.map((product) => ({
      ...product,
      type: 'regular'
    }))
  ]

  // Early Return, falls es keine Produkte gibt
  if (allFilteredProducts.length === 0) {
    return (
      <div className='mt-16'>
        <CategoryHeader category={searchCategory} />
        <div className='flex items-center justify-center h-[60vh]'>
          <p className='text-2xl font-medium text-primary'>
            Keine Produkte in dieser Kategorie gefunden
          </p>
        </div>
      </div>
    )
  }


  return (
    <div className='mt-16'>
      <CategoryHeader category={searchCategory} /> 
      <ProductsGrid products={allFilteredProducts} />
    </div>
  )
}

// Kategorienname
const CategoryHeader = ({ category }) => (
  <div className='flex flex-col items-end w-max mb-6'>
    <p className='text-2xl font-medium'>{category.text.toUpperCase()}</p>
    <div className='w-16 h-0.5 bg-primary rounded-full mt-2' />
  </div>
)

// Produkte
const ProductsGrid = ({ products }) => (
  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6'>
    {products.map((product) => 
      product.type === 'action' ? (
        <ProdCardAction 
          key={product._id} 
          actionProduct={product} 
        />
      ) : (
        <ProductCard 
          key={product._id} 
          product={product} 
        />
      )
    )}
  </div>
)

export default CategoryProducts