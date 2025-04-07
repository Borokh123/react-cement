import React from 'react';
import Card from '../components/Card/Card';
function Home({ cartItems, searchValue, items, onAddToFavourites, onAddToCart, isLoading }) {
    
    const renderItems = () => {
        const filterItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));


        return (isLoading
            ? [...Array(10)]
            : filterItems).map((item, index) => (

              
                <Card

                    key={index}

                    // title={item.title}
                    // imgUrl={item.imgUrl}
                    // price={item.price}

                    onFavourite={(obj) => onAddToFavourites(obj)}
                    onAddCart={(obj) => onAddToCart(obj)}
                    //added = {cartItems.some((obj) => Number(obj.id) === Number(item.id))}
                    //added = {cartItems.some((obj) => Number(obj.productId) === Number(item.id))}


                    loading={isLoading}
                    {...item}

                />

            ));


    };
    return (
        <div className="content">
            <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Весь цемент'}</h1>
            <div className="productGrid">
                {renderItems()}


            </div>
        </div>
    );
};
export default Home;