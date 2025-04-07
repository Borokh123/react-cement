import React from 'react';
import Card from "../components/Card/Card";

function Favorites({onAddToFavourites, favourites, isLoading}) {
    const isfavouritesEmpty = favourites.length === 0
    //console.log(state)
    return (
        <div className="content">
            {isfavouritesEmpty 
            ? <h1>В закладках нет товаров...</h1> 
            : <h1>Мои закладки</h1>}
                  
            <div className="productGrid">
                {(isLoading ? [...Array(10)] : favourites).map((item, index) => (
                    <Card
                        key={index}
                        {...item}
                        favourites = {favourites}
                        loading={isLoading}
                        onFavourite={(obj) => onAddToFavourites(obj)}
                    />))}
            </div>
        </div>
    );
};
export default Favorites;