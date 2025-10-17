import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Angebote from '../components/Angebote'
import Features from '../components/Features'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div className='mt-10'>
<Hero />
<Categories/>
<Angebote />
<Features />
<NewsLetter />
    </div>
  )
}

export default Home