import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

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

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavourites(favouritesResponse.data);
      setItems(itemResponse.data);



    }

    fetchData();
    //   fetch('https://632bfb445568d3cad879213d.mockapi.io/items')
    // .then((res) => {
    // return res.json()})
    // .then((json) => {
    //  setItems(json);
    // });

  }, [])

  //   const onAddToCart = (obj) => {
  //    // console.log(obj)
  //     try {
  //       if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
  //         axios.delete(`https://632bfb445568d3cad879213d.mockapi.io/cart/${obj.id}`); // поменял с favourites на cart
  //         setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
  //       } else {
  //         axios.post('https://632bfb445568d3cad879213d.mockapi.io/cart', obj);
  //         setCartItems((prev) => [...prev, obj]); // берем предидущее состояние копируем и добавляем новый обьект
  //       }


  //     } catch (error) {
  //       alert('Ошибка при добавлении');
  //     }


  //  };  


  const onAddToCart = async (obj) => {
    console.log(obj)
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

      const existingItem = (favourites.find((item) => Number(item.productId) === Number(obj.id)))

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

  // const onAddToFavourites = async (obj) => {
  //   try {
  //     if (favourites.find((favObj) => favObj.id === obj.id)) {
  //       axios.delete(`https://632bfb445568d3cad879213d.mockapi.io/favourites/${obj.id}`);
  //       setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
  //     } else {

  //       const { data } = await axios.post('https://632bfb445568d3cad879213d.mockapi.io/favourites', obj);
  //       setFavourites((prev) => [...prev, data]);
  //     }

  //   } catch (error) {
  //     alert('Не удалось добавить в фавориты');
  //   }
  // };
  


  // const added = (id) => {
  //   cartItems.some((obj) => Number(obj.productId) === Number(id))
  // }


  return (
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

        <Route path="/favorites" exact element={<Favorites items={favourites} onAddToFavourites={onAddToFavourites} />}>

        </Route>
      </Routes>



    </div>

  );
}

export default App;
