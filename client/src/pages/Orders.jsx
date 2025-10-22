import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { dummyOrders } from '../assets/assets'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const { currency } = useAppContext()

    const fetchOrders = async () => {
        setOrders(dummyOrders)
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <div className='mt-16 pb-16'>
            <div className='flex flex-col items-end w-max mb-8'>
                <h1 className='text-2xl font-medium'>Meine Bestellungen</h1>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>
            {orders.map((order, index) => (
                <div key={index} className='border border-dark-green/20 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
                    <p className='flex justify-between md:items-center text-black/40 md:font-medium
        max-md:flex-col md:text-end'>
                        <span>Bestellnr.: {order._id}</span>
                        <span>Zahlungsopt.: {order.paymentType}</span>
                        <span className='text-black'>Gesamtbetrag: {currency}{order.amount}</span>

                    </p>
                    {order.items.map((item, index) => (
                        <div key={index}
                        className={`relative bg-white text-black/40
                        ${order.items.length !== index + 1 && 'border-b'}
                        border-dark-green/20 flex flex-col md:flex-row md:items-center
                        justify-between p-4 py-5 md:gap-10 w-full max-w-4xl`}>
                            <div className='flex items-center mb-4 md:mb-0'>
                                <div className='bg-primary/10 p-4 rounded-lg'>
                                    <img src={item.product.image[0]}
                                        className='w-16 h-16 object-cover' />
                                </div>
                                <div className='ml-4'>
                                    <h2 className='text-xl font-medium text-dark-green'>{item.product.name}</h2>
                                    <p className='text-black/40'>Kategorie: {item.product.category}</p>
                                </div>
                            </div>

                            <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0 font-normal text-black/80 text-end'>
                                <p>Stückz.: {item.quantity || '1'}</p>
                                <p>Bestellstatus: {order.status}</p>
                                <p>Bestellung aufgegeben: {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <p className='text-dark-green text-lg font-medium'
                            >Zwischensumme: {currency}{item.product.price * item.quantity}</p>

                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Orders