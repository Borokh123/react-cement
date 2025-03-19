function Drawer({ onRemove, onClose, items = [] }) {
  return (
  <div className="overlay">
    <div className="drawer">
      <h2>Корзина покупок <img onClick={onClose} src="/img/close.svg" alt="close" /></h2>
      {
        items.length > 0 ? (

          <>
            <div className="items">
              {items.map((obj) => (
                <div key = {obj.id} className="cartItem">
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
                  <b>25 496 грн.</b>
                </li>
                <li className="tax">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1274.8 грн.</b>
                </li>
              </ul>
              <div className="totalBtn">
                <button className="greenButton"> Оформить заказ  <img src="/img/arrow.svg" alt="arrow" /></button>
              </div>
            </div>
          </>
        )





          :
          <>
          <div className="cartImg">
           
            <img src="/img/cart-img.svg" alt="cart-img" className="" />
            <h3>Корзина пустая</h3>
                               
          </div>
          <button className="greenButton" onClick={onClose} > Назад </button>
      </>
      }









    </div>
  </div>);
}
export default Drawer;