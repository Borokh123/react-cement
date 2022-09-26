import React from 'react';
import styles  from './Card.module.scss'
console.log(styles);
function Card ({onAddfavourite, title, price, imgUrl, onAddCart}) {
  const [isAdded, setIsAdded] = React.useState(false);
  const OnHandle = () => {
    onAddCart({ title, price, imgUrl});
    setIsAdded(!isAdded);
  }

  // const onClickButton = () => {
  //   alert (title);
  // }
    return (<div className={styles.card}>
    <div className={styles.favourite}>
        <img src= "img/heart.svg" alt="" onClick={onAddfavourite} />
    </div>
    <img width={150} height={150} src={imgUrl} alt="" />
    <p>{title}</p>
    <div className={styles.prCard}>
        <div className="price">
        <p>{price} грн.</p>
        </div>
            <img src= {isAdded ? "img/addToCartCh.svg" : "img/addToCart.svg" } alt="Add to Cart" onClick={OnHandle}  />
    </div>
  </div>);
}

export default Card;
