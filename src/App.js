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
  const [isOrderComplete, setisOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);

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
      // setIsLoading(true);
      try {
        const favouritesFromStorage = JSON.parse(localStorage.getItem('favourites')) || [];
        const [cartResponse, ordersResponse, itemResponse] = await Promise.all([
          axios.get('https://632bfb445568d3cad879213d.mockapi.io/cart'),
          axios.get('https://632bfb445568d3cad879213d.mockapi.io/favourites'), //сохранение в orders так как не работает путь orders в мокапи
          axios.get('https://632bfb445568d3cad879213d.mockapi.io/items')]);
        setIsLoading(false);
        setCartItems(cartResponse.data);
        setSavedOrders(ordersResponse.data);
        setFavourites(favouritesFromStorage);                             //стейт
        setItems(itemResponse.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);

      }

      // const cartResponse = await axios.get('https://632bfb445568d3cad879213d.mockapi.io/cart');
      // // .then((res) => {
      // // setCartItems(res.data);
      // // });

      // // const favouritesResponse = await axios.get('https://632bfb445568d3cad879213d.mockapi.io/favourites'); // все данные дождуться друг друга и только потом сохраняться в стейт
      // //  .then((res) => {                                                                                  // данные возьми как угодно в любом порядке, но сохраняй ифнормацию в стейт в следующем порядке
      // // .then((res) => {
      // // setFavourites(res.data);
      // // });
      // const ordersResponse  = await axios.get('https://632bfb445568d3cad879213d.mockapi.io/favourites');


      // const itemResponse = await axios.get('https://632bfb445568d3cad879213d.mockapi.io/items');   // и только тогда мы сможем кооррекнто оттобрадать что какой то товар был добавлен в корзину
      // //  .then((res) => {
      // //     setItems(res.data);
      // //   });


    }

    fetchData();
    //   fetch('https://632bfb445568d3cad879213d.mockapi.io/items')
    // .then((res) => {
    // return res.json()})
    // .then((json) => {
    //  setItems(json);
    // });

  }, [])



  // const onAddToCart = async (obj) => {
  //   //console.log(obj)
  //   try {

  //     const existingItem = (cartItems.find((item) => Number(item.productId) === Number(obj.productId)))
  //     if (existingItem) {
  //       setCartItems((prev) => prev.filter(item => Number(item.productId) !== Number(obj.productId)));
  //       await axios.delete(`https://632bfb445568d3cad879213d.mockapi.io/cart/${existingItem.id}`);

  //     } else {
  //       const { data } = await axios.post('https://632bfb445568d3cad879213d.mockapi.io/cart', obj);
  //       setCartItems((prev) => [...prev, data]);
  //     }
  //   } catch (error) {
  //     alert('Ошибка при добавлении');
  //   }
  // };

  const onAddToCart = async (obj) => {
    //console.log(obj)
    try {

      const existingItem = (cartItems.find((item) => Number(item.productId) === Number(obj.productId)))
      if (existingItem) {
        setCartItems((prev) => prev.filter(item => Number(item.productId) !== Number(obj.productId)));
        await axios.delete(`https://632bfb445568d3cad879213d.mockapi.io/cart/${existingItem.id}`);

      } else {
        setCartItems((prev) => [...prev, obj]); // Добавляем товар в локальный стейт фейковый
        const { data } = await axios.post('https://632bfb445568d3cad879213d.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if (item.productId === obj.productId) {
            return { ...item, id: data.id }; // Обновляем id товара
          }
          return item;
        }
        ));
      }
    } catch (error) {
      alert('Ошибка при добавлении');
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://632bfb445568d3cad879213d.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
  };


  // const onAddToFavourites = async (obj) => {

  //   try {

  //     const existingItem = (favourites.find((item) => Number(item.productId) === Number(obj.productId)));

  //     if (existingItem) {
  //       await axios.delete(`https://632bfb445568d3cad879213d.mockapi.io/favourites/${existingItem.id}`);
  //       setFavourites((prev) => prev.filter(item => Number(item.productId) !== Number(obj.productId)));
  //     } else {
  //       const { data } = await axios.post('https://632bfb445568d3cad879213d.mockapi.io/favourites', obj)
  //       setFavourites((prev) => [...prev, data]);
  //     }
  //   } catch (error) {
  //     alert('Не удалось добавить в фавориты');
  //   }
  // };



  const onAddToFavourites = (obj) => {
    try {
      // Получаем текущие избранные из localStorage
      // const favouritesFromStorage = JSON.parse(localStorage.getItem('favourites')) || [];

      // Проверяем, есть ли уже объект в избранных
      const existingItem = favourites.find(
        (item) => Number(item.productId) === Number(obj.productId)
      );

      if (existingItem) {
        // Если объект уже есть, удаляем его из избранных
        const updatedFavourites = favourites.filter(
          (item) => Number(item.productId) !== Number(obj.productId)
        );
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
        setFavourites(updatedFavourites);
      } else {
        // Если объекта нет, добавляем его в избранные
        const updatedFavourites = [...favourites, obj];
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
        setFavourites(updatedFavourites);
      }
    } catch (error) {
      alert('Не удалось обновить избранное');
    }
  };






  const isItemAdded = (productId) => {

    return cartItems.some((obj) => Number(obj.productId) === Number(productId));

  }
  const isFavAdded = (productId) => {

    return favourites.some((obj) => Number(obj.productId) === Number(productId));

  }

  // const onAddOrder = async () => {
  //   try {

  //     // Добавить текущие элементы корзины в заказы
  //     // Создать новый заказ с уникальным номером
  //     const newOrder = {
  //       id: `ORD-${Date.now() % 10000}`, // Уникальный идентификатор заказа
  //       date: new Date().toISOString(),
  //       items: cartItems
  //     };

  //     // Добавить новый заказ в массив с использованием оператора spread
  //     const updatedOrders = [...savedOrders, newOrder];

  //     // Сохранить обновленный список заказов обратно в localStorage
  //     localStorage.setItem('savedOrders', JSON.stringify(updatedOrders));
  //     const obj = JSON.parse(localStorage.getItem('savedOrders')) || [];
  //     setSavedOrders(obj); // Обновляем savedOrders

  //     // Установить номер заказа
  //     setOrderId(newOrder.id);

  //     setisOrderComplete(true);
  //     setCartItems([]);
  //     for (let i = 0; i < cartItems.length; i++) {
  //       const item = cartItems[i];
  //       await axios.delete('https://632bfb445568d3cad879213d.mockapi.io/cart/' + item.id)
  //       // await delay(1000);

  //     }
  //   } catch (error) {
  //     alert('ну удалось создать заказ :(')
  //   } finally {

  //   };
  // //   const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
  // //  console.log(savedOrders);


  // }

  const onAddOrder = async () => {
    try {
      // Создаём новый заказ
      const newOrder = {
        orderId: `ORD-${Date.now() % 10000}`, // Уникальный идентификатор заказа
        date: new Date().toISOString(),
        items: cartItems,
      };

      // Сохраняем заказ на сервере
      const { data } = await axios.post('https://632bfb445568d3cad879213d.mockapi.io/favourites', newOrder); // сохраняем в фаваориты потому что нельзя создать путь/orders в мокапи 

      // Обновляем локальное состояние заказов
      setSavedOrders((prev) => [...prev, data]);

      // Устанавливаем номер заказа
      setOrderId(data.orderId);

      // Очищаем корзину
      setisOrderComplete(true);
      setCartItems([]);

      // Удаляем товары из корзины на сервере
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://632bfb445568d3cad879213d.mockapi.io/cart/${item.id}`);
      }
    } catch (error) {
      alert('Не удалось создать заказ :(');
    }
  };

  return (
    <AppContext.Provider value={{ items, cartItems, favourites, savedOrders, setSavedOrders, isItemAdded, isFavAdded, setCartItems }}>
      <div className="wrapper">
        {cartOpened && <Drawer items={cartItems}
          isLoading={isLoading}
          onAddOrder={onAddOrder}
          isOrderComplete={isOrderComplete}
          orderId={orderId}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem} />}
        <Header onClickCart={() => setCartOpened(true)}
          onChangeSearch={(event) => setSearchValue(event.target.value)}
          searchHeaderValue={searchValue}
          setSpace={() => setSearchValue('')} />
        {/* <div className="breadcrumb"></div> */}
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
          <Route path="/orders" exact element={<Orders />}>
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
