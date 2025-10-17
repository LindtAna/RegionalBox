// Abschnitt "Warum wir die Besten sind" für Home Page
// Auflistung der Vorteile
// Liste der Service-Vorteile in featuresList.js

import { assets } from '../assets/assets'
import { features } from '../assets/collections/featuresList'

const Features = () => {
    return (
        <div className='relative mt-24'>
            <img src={assets.bottom_banner_image} alt='write normal'
                className='w-full hidden md:block' />
            <img src={assets.bottom_banner_image_sm} alt='write normal'
                className='w-full md:hidden' />
            <div className='absolute inset-0 flex flex-col items-center md:items-end
md:justify-center pt-16 md:pt-0'>
                <div className='px-8'>
                    <h1 className='text-xl md:text-3xl font-semibold text-dark-green mb-6'>
                        Warum wir die Besten sind
                    </h1>
                    {features.map((feature, index) => (
                        <div key={index} className='flex items-center md:gap-4 gap-2 mt-1'>
                            <img src={feature.icon} alt={feature.title}
                                className='md:w-11 w-7' />
                            <div>
                                <h3 className='text-m md:text-xl font-semibold'>{feature.title}</h3>
                                <p className='text-dark-green text-xs md:text-sm'>{feature.description}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features