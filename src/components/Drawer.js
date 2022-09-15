function Drawer () {
(<div style={{display : 'none'}} className="overlay">
    <div className="drawer">
    <h2>Корзина покупок <img className="removeBtn" src="/img/close.svg" alt="close" /></h2>
   
    <div className="items">
    <div className="cartItem">
      <img width={70} height={70} src="img/cement/2.png" alt="цемент" />
      <div className="namePrice">
        <p>Цемент HEIDELBERGCEMENT-400 25кг:</p>
        <b>200 грн.</b>
      </div>
      <img className="removeProduct" src="/img/cross.svg" alt="close" />
    </div>
    <div className="cartItem">
      <img width={70} height={70} src="img/cement/3.png" alt="цемент" />
      <div className="namePrice">
        <p>Цемент HEIDELBERGCEMENT-400 25кг:</p>
        <b>200 грн.</b>
      </div>
      <img src="/img/cross.svg" alt="close" />
    </div>
    <div className="cartItem">
      <img width={70} height={70} src="img/cement/3.png" alt="цемент" />
      <div className="namePrice">
        <p>Цемент HEIDELBERGCEMENT-400 25кг:</p>
        <b>200 грн.</b>
      </div>
      <img src="/img/cross.svg" alt="close" />
    </div>
    

  
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
</div>)
}
export default Drawer;