function Drawer({obj, onDelCart, onClose, items = [] }) {

  

  return (<div className="overlay">
    <div className="drawer">
      <h2>Корзина покупок <img onClick={onClose} src="/img/close.svg" alt="close" /></h2>

      <div className="items">
        {items.map((obj) => (
          <div className="cartItem">
            <img width={70} height={70} src={obj.imgUrl} alt="цемент" />
            <div className="namePrice">
              <p>{obj.title}</p>
              <b>{obj.price}</b>
            </div>
            <img className="removeProduct"  src="/img/cross.svg" alt="close" />
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
        <div className="greenButton">
          <button className="greenButton"> Оформить заказ  <img src="/img/arrow.svg" alt="arrow" /></button>
        </div>
      </div>
    </div>
  </div>);
}
export default Drawer;