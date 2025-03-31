import React from 'react';
import Card from "../components/Card/Card";

function Favorites({onAddToFavourites, favourites, isLoading}) {
  
    //console.log(state)
    return (
        <div className="content">
            <h1>Мои закладки</h1>
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