import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';


function App() {
  return (
  <div className="wrapper">
    
    <Drawer/>
   
    <Header/>
      <div className="breadcrumb"></div>
      <div className="content">
        <h1>Цемент</h1>
      <div className="productGrid">
        <Card/>
        <Card/>
        <Card/>
        <Card/>

        
        
      </div>
    
        
        
      </div>
     
  </div>
    
  );
}

export default App;
