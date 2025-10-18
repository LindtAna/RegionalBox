import { categories } from '../assets/collections/categoriesList'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Categories = () => {

    const { navigate } = useAppContext()
    return (

        <div className='mt-3 md:mt-10'>
            <div className='flex justify-between items-center'>
                 <p className='text-2xl md:text-3xl font-medium'>Kategorien</p>
                
                <div className='flex gap-2'>
                    <img src={assets.arrow_left_icon} /> <img src={assets.arrow_right_icon} />
                </div>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-7 md:grid-cols-5
            sm:grid-cols-3 mt-6 gap-6 grid-container'>

                {categories.slice(0,7).map((category, index) => (
                    <div key={index} className='group cursor-pointer py-5 px-3 gap-2 
                     rounded-lg flex flex-col justify-center items-center border-1 border-solid border-dark-green/20'
                        style={{ backgroundColor: category.bgColor }}
                        onClick={() => {
                            navigate(`/products/${category.path.toLowerCase()}`)
                            scrollTo(0, 0)
                        }}>
                        <img src={category.image} alt={category.text}
                            className='group-hover:scale-125 transition max-w-28' />
                        <p className='text-sm font-medium'>{category.text}</p>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories