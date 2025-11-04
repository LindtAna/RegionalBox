import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const OrdersList = () => {
    
  const {currency, axios} = useAppContext()
  const [ordersList, setOrdersList] = useState([])

  const fetchOrdersList = async () => {
    try {
            const { data } = await axios.get('/api/orders/seller')

            if (data.success) {
              setOrdersList(data.orders)
            } else { toast.error(data.message) }
        } catch (error) {
            toast.error(error.message)
        }
  }

  useEffect(() => {
    fetchOrdersList()
  }, [])
     return (
    <div className="flex-1 h-[95vh] overflow-y-scroll no-scrollbar">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Bestellungen</h2>

        {ordersList.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between gap-5 p-5
             max-w-6xl rounded-md border border-dark-green/20 text-black 
             "
          >
  
            <div className="md:w-[5%] flex sm:justify-start justify-center items-center shrink-0">
              <img
                className="w-12 h-12 object-contain"
                src={assets.box_icon}
                alt="boxIcon"
              />
            </div>

   <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:divide-x md:divide-gray-300 flex-1">      
            <div className="md:w-[30%] px-3 break-words">
              {order.items.map((item, i) => (
                <p key={i} className="font-medium leading-snug break-words">
                  {item.product.name}{" "}
                  <span className="text-primary">x {item.quantity}</span>
                </p>
              ))}
            </div>

         
            <div className="md:w-[28%] px-3 text-sm text-black/80 break-words">
              <p>
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city}
              </p>
              <p>
                {order.address.postcode}, {order.address.country}
              </p>
              <p>{order.address.phone}</p>
            </div>

        
            <div className="md:w-[13%] flex sm:justify-center justify-start gap-4 items-center px-3 text-lg font-medium text-black/80 whitespace-nowrap">
              {currency}
              {order.amount.toFixed(2)}
            </div>

          
            <div className="md:w-[27%] px-3 text-sm break-words">
              <p>Zahlungsopt.: {order.paymentType}</p>
              <p>
                Bestellung aufgegeben:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>Status: {order.isPaid ? "Bezahlt" : "Ausstehend"}</p>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;