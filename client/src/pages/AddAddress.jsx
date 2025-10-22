import React, { useState } from 'react'
import { assets } from '../assets/assets'

//Input Field Component

const InputField = ({ type, placeholder, name, handleChange, address }) => (
    <input
        className='w-full px-2 py-2.5 border border-dark-green/20 rounded outline-none
    text-black focus:border-dark-green/60 transition'
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={address[name]}
        required
    />
)

const AddAddress = () => {

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        phone: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }))
        console.log(address)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
    }


    return (
        <div className='mt-10 pb-10'>
            <p className='text-2xl md:text-3xl text-black'>Eine neue
                <span className='fpnt-semibold text-primary'> Lieferadresse</span> hinzufügen</p>
            <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
                <div className='flex-1 max-w-md'>
                    <form
                        onSubmit={onSubmitHandler}
                        className='space-y-3 mt-6 text-sm'>

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange}
                                address={address}
                                name='firstName'
                                type='text'
                                placeholder='Vorname' />

                            <InputField handleChange={handleChange}
                                address={address}
                                name='lastName'
                                type='text'
                                placeholder='Nachname' />
                        </div>

                        <InputField handleChange={handleChange}
                            address={address}
                            name='phone'
                            type='text'
                            placeholder='Telefonnummer' />


                        <InputField handleChange={handleChange}
                            address={address}
                            name='street'
                            type='text'
                            placeholder='Straße' />

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange}
                                address={address}
                                name='postcode'
                                type='text'
                                placeholder='PLZ' />


                            <InputField handleChange={handleChange}
                                address={address}
                                name='city'
                                type='text'
                                placeholder='Stadt' />

                        </div>

                        <InputField handleChange={handleChange}
                            address={address}
                            name='country'
                            type='text'
                            placeholder='Land/Region' />

                            <button className='w-full mt-6 bg-primary rounded-lg text-white py-3 hover:bg-dark-green
                            transiltion cursor-pointer uppercase'>
                                Diese Adresse verwenden
                            </button>

                    </form>
                </div>
                <img className='md:mr-36 mb-16 md:mt-0'
                src={assets.add_address_image} alt='' />
            </div>
        </div>
    )
}

export default AddAddress