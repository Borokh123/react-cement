import React, { createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

export const AppContext = createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [savedOrders, setSavedOrders] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

//   React.useEffect(() => {
//     async function fetchOrders() {
//         const orders = JSON.parse(localStorage.getItem('orders')) || [];
//         setSavedOrders(orders);
//         await delay(200); // Ждём 2 секунды перед отключением скелетонов
//         setIsLoading(false);
//     }
//     fetchOrders();
// }, []);

  React.useEffect(() => {

    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get('https://632bfb445568d3cad879213d.mockapi.io/cart');
      // .then((res) => {
      // setCartItems(res.data);
      // });

      const favouritesResponse = await axios.get('https://632bfb445568d3cad879213d.mockapi.io/favourites');
      // .then((res) => {
      // setFavourites(res.data);
      // });

      const itemResponse = await axios.get('https://632bfb445568d3cad879213d.mockapi.io/items');
      //  .then((res) => {
      //     setItems(res.data);
      //   });

      
      const orders =  await JSON.parse(localStorage.getItem('orders')) || [];
      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavourites(favouritesResponse.data);
      setItems(itemResponse.data);
      setSavedOrders(orders);


    }

    fetchData();
    //   fetch('https://632bfb445568d3cad879213d.mockapi.io/items')
    // .then((res) => {
    // return res.json()})
    // .then((json) => {
    //  setItems(json);
    // });

  }, [])

  

  const onAddToCart = async (obj) => {
    //console.log(obj)
    try {

      const existingItem = (cartItems.find((item) => Number(item.productId) === Number(obj.id)))
      if (existingItem) {
        await axios.delete(`https://632bfb445568d3cad879213d.mockapi.io/cart/${existingItem.id}`);
        setCartItems((prev) => prev.filter(item => Number(item.productId) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://632bfb445568d3cad879213d.mockapi.io/cart', {
          ...obj,
          productId: obj.id // Добавляем productId
        });
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Ошибка при добавлении');
    }
  };


  const onAddToFavourites = async (obj) => {

    try {

      const existingItem = (favourites.find((item) => Number(item.productId) === Number(obj.id)));

      if (existingItem) {
        await axios.delete(`https://632bfb445568d3cad879213d.mockapi.io/favourites/${existingItem.id}`);
        setFavourites((prev) => prev.filter(item => Number(item.productId) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://632bfb445568d3cad879213d.mockapi.io/favourites', {
          ...obj,
          productId: obj.id // Добавляем productId
        });
        setFavourites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };



  


  const onRemoveItem = (id) => {
    axios.delete(`https://632bfb445568d3cad879213d.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
  };


  const isItemAdded = (id) => {

    return cartItems.some((obj) => Number(obj.productId) === Number(id));
    //cartItems.some((obj) => Number(obj.id) === Number(id));
  }
  const isFavAdded = (id) => {

    return favourites.some((obj) => Number(obj.productId) === Number(id));
    //cartItems.some((obj) => Number(obj.id) === Number(id));
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favourites, savedOrders, setSavedOrders, isItemAdded, isFavAdded, setCartItems }}>
      <div className="wrapper">

        {cartOpened && <Drawer items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem} />}

        <Header onClickCart={() => setCartOpened(true)}
          onChangeSearch={(event) => setSearchValue(event.target.value)}
          searchHeaderValue={searchValue}
          setSpace={() => setSearchValue('')} />

        <div className="breadcrumb"></div>
        <Routes>
          <Route path="/" exact element={<Home
            cartItems={cartItems}
            favourites={favourites}
            items={items}
            onAddToCart={onAddToCart}
            onAddToFavourites={onAddToFavourites}
            searchValue={searchValue}
            isLoading={isLoading}
          // added ={added}

          />}>

          </Route>

          <Route path="/favorites" exact element={<Favorites favourites={favourites} onAddToFavourites={onAddToFavourites} isLoading={isLoading} />}>
          </Route>
          <Route path="/orders" exact element={<Orders isLoading={isLoading} />}>
          </Route>
        </Routes>



      </div>
    </AppContext.Provider>
  );
}

export default App;
