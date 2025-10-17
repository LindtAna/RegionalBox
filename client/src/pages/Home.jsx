import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Angebote from '../components/Angebote'
import Features from '../components/Features'

const Home = () => {
  return (
    <div className='mt-10'>
<Hero />
<Categories/>
<Angebote />
<Features />
    </div>
  )
}

export default Home