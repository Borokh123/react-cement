import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = [
  {title:'Цемент HEIDELBERGCEMENT-400 25кг:', price:'225', imgUrl:'/img/cement/2.png'},
  {title:'Цемент HEIDELBERGCEMENT-500 25кг:', price:'275', imgUrl:'/img/cement/3.png'},
  {title:'Цемент HEIDELBERGCEMENT-400 25кг:', price:'250', imgUrl:'/img/cement/4.png'}
];


function App() {
  return (
  <div className="wrapper">
    
    <Drawer/>
   
    <Header/>
      <div className="breadcrumb"></div>
      <div className="content">
        <h1>Цемент</h1>
      <div className="productGrid">
        
        {arr.map((obj) => (
        <Card 
        title = {obj.title}
        imgUrl = {obj.imgUrl}
        price = {obj.price}
        onClick = {() => alert(obj.title)}
        />))}
       
        

        
        
      </div>
    
        
        
      </div>
     
  </div>
    
  );
}

export default App;
