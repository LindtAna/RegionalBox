import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate } = useAppContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (isSeller) navigate('/seller')
    }, [isSeller])

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        isSeller(true)
    }

    return !isSeller && (
        <form onSubmit={onSubmitHandler}
            className="min-h-screen flex items-center text-sm">
            <div className='flex flex-col gap-4 m-auto items-center p-8 py-12 w-80 sm:w-[352px] text-black
            rounded-2xl shadow-xl border border-gray-200 bg-white'>
                <h1 className="text-2xl font-medium">
                    <span className='text-primary'>Seller</span> Login
                </h1>
                <p className="text-dark-green text-sm pb-1">
                    Bitte melden Sie sich an, um fortzufahren.
                </p>

                <div className="w-full ">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)} value={email}
                        type='email'
                        placeholder="E-Mail-Adresse ist ein Pflichtfeld"
                        className="border border-dark-green/20 placeholder:text-primary/60 rounded-full w-full p-2 mt-1 outline-dark-green"
                        required />
                </div>
                <div className="w-full ">
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)} value={password}
                        type='password'
                        placeholder="Password ist ein Pflichtfeld"
                        className="border border-dark-green/20 placeholder:text-primary/60 rounded-full w-full p-2 mt-1 outline-dark-green"
                        required />
                </div>

                <button className="bg-primary hover:bg-dark-green transition-all text-white w-full py-2 rounded-full cursor-pointer">
                    Einloggen
                </button>
            </div>
        </form>
    )
}

export default SellerLogin