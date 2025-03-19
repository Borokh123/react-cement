import Card from "../components/Card";
function Favorites({items, onAddToFavourites}) {
    return (
        <div className="content">
            <h1>Мои закладки</h1>
            <div className="productGrid">
                {items.map((item, index) => (
                    <Card
                        key={index}
                        // id ={item.id}
                        // title={item.title}
                        // imgUrl={item.imgUrl}
                        // price={item.price}
                        {...item}
                        favorited = {true}
                        onFavourite={(obj) => onAddToFavourites(obj)}
                    />))}
            </div>
        </div>
    );
};
export default Favorites;