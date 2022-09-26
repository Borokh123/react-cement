import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';




function App() {
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  React.useEffect(()=>{fetch('https://632bfb445568d3cad879213d.mockapi.io/items')
  .then((res) => {
  return res.json()})
  .then((json) => {
   setItems(json);
  });
},[])

const onAddToCart = (obj) => {
  setCartItems((prev) => [...prev, obj]);
  console.log(obj);

};





 



  return (
  <div className="wrapper">
    
    {cartOpened && <Drawer items = {cartItems} onClose = {() => setCartOpened(false)}/>}
   
    <Header onClickCart = {() => setCartOpened(true)}
    onChangeSearch = {(event) => setSearchValue(event.target.value)}
    searchHeaderValue = {searchValue}
    setSpace = {() => setSearchValue('')}


    />
      <div className="breadcrumb"></div>
      <div className="content">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"`:'Все кроссовки'}</h1>
      <div className="productGrid">
        
        {items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
        <Card 
        key={index}
        title = {item.title}
        imgUrl = {item.imgUrl}
        price = {item.price}
        onAddfavourite  = {() => console.log('Добавили в избранное')}
        onAddCart = {(obj) => onAddToCart(obj)}
        

        />))}
       
        

        
        
      </div>
    
        
        
      </div>
     
  </div>
    
  );
}

export default App;
