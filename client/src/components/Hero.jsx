import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

// Main Banner
const Hero = () => {
    return (
        <div className='relative'>
            <img src={assets.main_banner_bg} alt='Werbebanner mit einem Einkaufswagen voller Früchte'
                className='w-full hidden md:block rounded-lg' />
            <img src={assets.main_banner_bg_sm} alt='Werbebanner mit einem Einkaufswagen voller Früchte'
                className='w-full md:hidden' />

            <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end
             md:justify-center pb-10 md:pb-0 px-4 md:pl-18 lg:pl-24'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center
                md:text-left max-w-72 md:max-w-105 lg:max-w-140 leading-tight lg:leading-15 '>
                    Schnell, frisch, fair!
                    Lieferung in 3 Stunden!
                </h1>
                <h2 className='text-l md:text-xl lg:text-2xl font-medium text-center
                md:text-left max-w-72 md:max-w-80 lg:max-w-140 leading-tight lg:leading-15 '>Kostenloser Versand beim ersten Einkauf ab 39 €.</h2>

                <div className='flex flex-col md:flex-row items-center md:mt-5 font-medium '>
                    <Link to={'/products'} className='text-sm md:text-lg flex items-center gap-2 px-7 md:px-9 
py-3 bg-primary hover:bg-dark-green transition rounded my-5
text-white cursor-pointer'>
                        Jetzt einkaufen
                        <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt='' />
                    </Link>
                    <Link to={'/products'}
                        className='text-sm md:text-lg flex items-center gap-2 px-7 py-3 cursor-pointer'>
                        Angebote anschauen
                        <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt='' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero