import React, { useContext } from 'react'
import Info from './../components/Info'
import axios from 'axios';
import { Usercart } from '../hooks/Usercart';
import { AppContext } from '../App';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function Drawer({ onRemove, onClose, items = [] }) {
  const { setSavedOrders, savedOrders } = useContext(AppContext);
//   const updateOrders = () => {
//     const orders = JSON.parse(localStorage.getItem('orders')) || [];
//     setSavedOrders(orders);
// };


  const [isOrderComplete, setisOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isloading, setIsloading] = React.useState(false);
  const { cartItems, setCartItems, totalPrice } = Usercart();
  const onClickOrder = async () => {
    try {
      setIsloading(true);


      // Получить текущие сохраненные заказы из localStorage
      const orders = JSON.parse(localStorage.getItem('orders')) || [];

      // Добавить текущие элементы корзины в заказы
      // Создать новый заказ с уникальным номером
      const newOrder = {
        id: `ORD-${Date.now() % 10000}`, // Уникальный идентификатор заказа
        date: new Date().toISOString(),
        items: cartItems
      };

      // Добавить новый заказ в массив с использованием оператора spread
      const updatedOrders = [...orders, newOrder];

      // Сохранить обновленный список заказов обратно в localStorage
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      const obj = JSON.parse(localStorage.getItem('orders')) || [];
      setSavedOrders(obj); // Обновляем savedOrders

      // Установить номер заказа
      // setOrderId(newOrder.id);

      setisOrderComplete(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://632bfb445568d3cad879213d.mockapi.io/cart/' + item.id)
        await delay(1000);

      }
    } catch (error) {
      alert('ну удалось создать заказ :(')
    } finally {
      setIsloading(false);
    };
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    // console.log(savedOrders);


  }
  return (
    <div className="overlay">
      <div className="drawer">
        <h2>Корзина покупок <img onClick={onClose} src="/img/close.svg" alt="close" /></h2>
        {
          items.length > 0 ? (

            <>
              <div className="items">
                {items.map((obj) => (
                  <div key={obj.id} className="cartItem">
                    <img width={70} height={70} src={obj.imgUrl} alt="цемент" />
                    <div className="namePrice">
                      <p>{obj.title}</p>
                      <b>{obj.price}</b>
                    </div>
                    <img className="removeProduct" src="/img/cross.svg" alt="remove" onClick={() => onRemove(obj.id)} />
                  </div>

                ))}
              </div>
              <div className="cartTotalBlock">
                <ul>
                  <li className="total">
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} грн.</b>
                  </li>
                  <li className="tax">
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>{(totalPrice * 5) / 100} грн.</b>
                  </li>
                </ul>
                <div className="totalBtn">
                  <button disabled={isloading} onClick={onClickOrder} className="greenButton"> Оформить заказ  <img src="/img/arrow.svg" alt="arrow" /></button>
                </div>
              </div>
            </>
          )


            :
            <>
              <Info
                title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
                description={isOrderComplete ? `Ваш заказ #${orderId} будет сформирован и передан курьерской доставке` : 'Добавьте хотя бы один товар'}
                image={isOrderComplete ? "/img/order-completed.svg" : "/img/cart-img.svg"} />
              <button className="greenButton" onClick={onClose} > Назад </button>
            </>
        }









      </div>
    </div>);
}
export default Drawer;