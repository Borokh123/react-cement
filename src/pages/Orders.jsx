import React, { useContext } from 'react';
import Card from "../components/Card/Card";
import { AppContext } from '../App';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function Orders({isLoading}) {
       const {savedOrders} = useContext(AppContext);
    // React.useEffect(() => {
    //     const orders = JSON.parse(localStorage.getItem('orders')) || [];
    //     setSavedOrders(orders);
    //     delay(2000);
    //     setIsLoading(false);
    // }, []);

    return (
        <div className="content">
            <h1>Мои заказы</h1>

            {savedOrders.map(order => (
                <div key={order.id} className="order">
                    <div className="orderId">
                        <h4>Заказ: #{order.orderId}</h4>
                        <p>Дата и время: {new Date(order.date).toLocaleString()}</p>
                    </div>

                    <div className="productGrid">
                        {(isLoading 
                        ? [...Array(10)] 
                        : order.items).map((item, index) => (
                            <Card
                                key={index}
                               
                                loading = {isLoading}
                                {...item}
                            

                            />))}
                    </div>

                </div>
            ))}


        </div>
    );
};
export default Orders;