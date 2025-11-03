import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const { currency, axios, user } = useAppContext()

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/orders/user', {
                params: { userId: user._id }
            });
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (user) {
            fetchOrders()
        }

    }, [user])

    return (
        <div className='mt-16 pb-16'>
            <div className='flex flex-col items-end w-max mb-8'>
                <h1 className='text-2xl font-medium'>Meine Bestellungen</h1>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>
            {orders.map((order, index) => (
                <div key={index} className='border border-dark-green/20 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
                    <p className='flex justify-between md:items-center text-black md:font-medium
        max-md:flex-col md:text-end'>
                        <span>Bestellnr.: {order._id}</span>
                        Zahlungsopt.: {order.paymentType === 'COD' ? 'Bargeld' : order.paymentType}
                        <span className='text-black'>Gesamtbetrag: {currency}{order.amount.toFixed(2)}</span>

                    </p>
                    {order.items.map((item, index) => (
                        <div key={index}
                            className={`relative bg-white text-black/40
                        ${order.items.length !== index + 1 && 'border-b'}
                        border-dark-green/20 flex flex-col md:flex-row md:items-center
                        justify-between p-4 py-5 md:gap-10 w-full max-w-4xl`}>

                            <div className='flex-shrink-0 w-[8%]'>
                                <div className='w-16 h-16 aspect-square bg-primary/10 p-2 overflow-hidden rounded-lg'>
                                    <img src={item.product.image[0]}
                                        className='w-full h-full object-cover' />
                                </div>
                                </div>
                                <div className="w-[32%] flex flex-col justify-start">
                                    <h2 className='text-xl font-medium text-dark-green'>{item.product.name}</h2>
                                    <p className='text-dark-green/60'>Kategorie: {item.product.category}</p>
                                </div>
                        

                            <div className="w-[30%] pl-4 flex flex-col gap-1.5 justify-center text-dark-green">
                                <p>Stückz.: {item.quantity || '1'}</p>
                                <p>Bestellstatus: {order.status}</p>
                                <p>Datum: {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                          <div className="w-[30%] pl-4 flex items-center justify-start">  
                            <p className='text-dark-green text-lg font-medium'
                            >Zwischensumme: {currency}{(item.product.price * item.quantity).toFixed(2)}</p>
                             </div>

                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Orders