import React from 'react'
import Info from './../components/Info'
import { Usercart } from '../hooks/Usercart';
//const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function Drawer({ onRemove, onClose, items = [], isOrderComplete, orderId, onAddOrder, isloading }) {

  const { totalPrice } = Usercart();

const  onClickOrder = () => {

   onAddOrder();
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