import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'


const Hero = () => {
    return (
        <div className='relative rounded-lg overflow-hidden'>
            {/* video banner */}
            <video
                src={assets.banner_video}
                autoPlay
                loop
                muted
                playsInline
                className='w-full h-full object-cover hidden md:block'
            ></video>

            {/* video banner mobile*/}
            <video
                src={assets.banner_video_sm}
                autoPlay
                loop
                muted
                playsInline
                className='w-full h-full object-cover md:hidden'
            ></video>
            <div className='absolute inset-0 bg-black/20 z-5'></div>
              
          {/* Möglichkeit für ein statisches png-Banner */}
            {/* <div className='relative'>
                <img src={assets.main_banner_bg} alt='Werbebanner mit einem Einkaufswagen voller Früchte'
                    className='w-full hidden md:block rounded-lg' />
                <img src={assets.main_banner_bg_sm} alt='Werbebanner mit einem Einkaufswagen voller Früchte'
                    className='w-full md:hidden' /> */}

                <div
                    className='absolute inset-0 flex flex-col items-center md:items-start justify-end
                md:justify-center pb-10 md:pb-0 px-4 md:pl-18 lg:pl-24 z-10'
                >
                    <h1
                        className='text-3xl md:text-4xl lg:text-5xl font-bold text-center
                md:text-left max-w-72 md:max-w-105 lg:max-w-140  text-white leading-tight lg:leading-15 '
                    >
                        Schnell, frisch, fair!
                        Lieferung in 3 Stunden!
                    </h1>

                    <h2
                        className='text-l md:text-xl lg:text-2xl font-medium text-center
                md:text-left max-w-72 md:max-w-80 lg:max-w-140 text-white leading-tight lg:leading-15'
                    >
                        Kostenloser Versand beim ersten Einkauf ab 39 €.
                    </h2>

                    <div className='flex flex-col md:flex-row items-center md:mt-5 font-medium'>
                        <Link
                            to={'/products'}
                            className='group text-sm md:text-lg flex items-center gap-2 px-7 md:px-9 
                        py-3 bg-primary hover:bg-dark-green transition rounded my-5
                        text-white cursor-pointer'
                        >
                            Jetzt einkaufen
                            <img
                                className='md:hidden transition group-focus:translate-x-1'
                                src={assets.arrow_white_icon}
                                alt=''
                            />
                        </Link>

                        <Link
                            to={'/deals'}
                            className='group text-sm md:text-lg text-white flex items-center gap-2 px-7 py-3 cursor-pointer'
                        >
                            Angebote anschauen
                            <img
                                className='group transition group-hover:translate-x-1'
                                src={assets.arrow_white_icon}
                                alt=''
                            />
                        </Link>
                    </div>
                </div>
            </div>
            )
}

            export default Hero