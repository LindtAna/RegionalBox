import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Angebote from '../components/Angebote'
// import BestSeller from '../components/BestSeller'

const Home = () => {
  return (
    <div className='mt-10'>
<Hero />
<Categories/>
<Angebote />
{/* <BestSeller /> */}
    </div>
  )
}

export default Home