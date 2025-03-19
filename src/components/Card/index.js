import React from 'react';
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss'

function Card({ id, title, price, imgUrl, onAddCart, onFavourite, favorited, added, loading = false }) {
  ///console.log(added);
  /// console.log(favorited);
  const [isAdded, setIsAdded] = React.useState(added);
  const [isFavourite, setIsFavourite] = React.useState(favorited);




  React.useEffect(() => {
    setIsAdded(added);
  }, [added]);

  React.useEffect(() => {
    setIsFavourite(favorited);
  }, [favorited]);


  const onHandleClick = () => {
    //console.log({ id, title, price, imgUrl })
    onAddCart({ id, title, price, imgUrl });
    setIsAdded(!isAdded);
  }


  const onAddFavourite = () => {
    console.log({ id, title, price, imgUrl })
    onFavourite({ id, title, price, imgUrl });
    setIsFavourite(!isFavourite);
    // console.log(favorited);
  }


  return (


    <div className={styles.card}>
      {
        loading ? <ContentLoader
          speed={2}
          width={199}
          height={368}
          viewBox="0 0 199 368"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"

        >

          <rect x="5" y="31" rx="7" ry="7" width="150" height="150" />
          <rect x="5" y="196" rx="7" ry="7" width="150" height="26" />
          <rect x="6" y="317" rx="7" ry="7" width="65" height="20" />
          <rect x="136" y="312" rx="7" ry="7" width="24" height="24" />
          <rect x="6" y="237" rx="7" ry="7" width="115" height="26" />
        </ContentLoader> :
          <>
            <div className={styles.favourite}>
              <img className={styles.svgImg} src={isFavourite ? "img/heart-checked.svg" : "img/heart.svg"} alt="bookmark" onClick={onAddFavourite} />

            </div>
            <img width={150} height={150} src={imgUrl} alt="" />
            <p>{title}</p>
            <div className={styles.prCard}>
              <div className="price">
                <p>{price} грн.</p>
              </div>
              <img className={styles.svgImg} src={isAdded ? "img/addToCartCh.svg" : "img/addToCart.svg"} alt="Add to Cart" onClick={onHandleClick} />

            </div>
          </>

      }


    </div>
  );
}

export default Card;
