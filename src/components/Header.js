import React from 'react';
function Header({onClickCart, onChangeSearch, searchHeaderValue,setSpace}) {
 
  const [isOpen, setIsOpen] = React.useState(false);
  const OnOpen = () => {
    setIsOpen(!isOpen);
  }
  // const OnSearch = (event) => {
  //   onChangeSearch(event.target.value);
  
  // }

 
    return (<header>
        <div className="headerLeft">
          <img src={isOpen ? "img/close-menu.svg" : "img/open-menu.svg" } alt="Add to Cart" onClick={OnOpen} />
          <div id="logo">
          <img src="/img/logo.png" alt="logo" />
          </div>
       </div>
       <div className="search-block">
        <img src="/img/search.svg" alt="Search" />
        <input  onChange={onChangeSearch} value = {searchHeaderValue} placeholder="Поиск..." />
        {searchHeaderValue && <img onClick = {setSpace} className="clear"  src="/img/cross.svg" alt="clear" />}
       </div>
       <ul className="headerRight">
          <li className="user">
          <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="m18 7.5c0 3.3137-2.6863 6-6 6-3.31375 0-6.00005-2.6863-6.00005-6 0-3.31371 2.6863-6 6.00005-6 3.3137 0 6 2.68629 6 6zm-2 0c0 2.20914-1.7909 4-4 4-2.20918 0-4.00005-1.79086-4.00005-4s1.79087-4 4.00005-4c2.2091 0 4 1.79086 4 4z "/><path d="m1.49996 22.5c.91192.4104.91152.4113.91152.4113l.00115-.0024c.00283-.006.00826-.0174.01636-.0339.01621-.0328.04305-.0857.08107-.1557.07611-.1402.19659-.3484.3657-.6021.33888-.5083.86856-1.1924 1.62187-1.8773 1.49422-1.3583 3.88685-2.7399 7.50237-2.7399 3.6154 0 6.0081 1.3816 7.5023 2.7399.7533.6849 1.283 1.369 1.6219 1.8773.1691.2537.2895.4619.3657.6021.038.07.0648.1229.081.1557.0081.0165.0136.0279.0164.0339l.0011.0024s-.0004-.0009.9116-.4113c.9119-.4104.9114-.4114.9114-.4114l-.0005-.0012-.0013-.0027-.0032-.0072-.0097-.0208c-.0079-.0167-.0186-.039-.0322-.0665-.0271-.055-.0659-.1311-.1169-.2251-.1021-.1879-.2534-.4485-.4593-.7573-.4112-.6167-1.044-1.4326-1.9407-2.2477-1.8057-1.6417-4.6631-3.2601-8.8476-3.2601-4.18457 0-7.04194 1.6184-8.84772 3.2601-.89669.8151-1.52951 1.631-1.94062 2.2477-.2059.3088-.357294.5694-.459306.7573-.05104.094-.089823.1701-.116976.2251-.01358.0275-.024262.0498-.032124.0665l-.009691.0208-.00328.0072-.001252.0027-.00053.0012s-.000465.001.911459.4114z"/></svg>
          </li>
          <li onClick={onClickCart}>  
          <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40px" height="40px"><path d="M0.5 4.5C0.5 3.67157 1.17157 3 2 3H5.4264C7.29819 3 8.97453 4.15869 9.63602 5.9097L10.4264 8.00178C10.4503 8.00062 10.4745 8.00002 10.4987 8L34.0093 7.98001C37.2162 7.97728 39.3967 11.2342 38.1722 14.1982L34.3031 23.5639C33.8485 24.6643 32.8658 25.4581 31.6944 25.6711L18.7279 28.0286C16.5907 28.4172 14.481 27.2236 13.7133 25.1915L6.8296 6.9699C6.60911 6.38623 6.05033 6 5.4264 6H2C1.17157 6 0.5 5.32843 0.5 4.5ZM11.5587 10.9991L16.5197 24.1313C16.7756 24.8087 17.4789 25.2065 18.1913 25.077L31.1577 22.7195C31.3251 22.689 31.4655 22.5756 31.5304 22.4184L35.3995 13.0527C35.8077 12.0648 35.0809 10.9791 34.0119 10.98L11.5587 10.9991Z"/> 
            <circle cx="13.5" cy="34" r="3"></circle>
            <circle cx="31.5" cy="34" r="3"></circle>
          </svg> <span>1 грн.</span>
           </li>
        
         </ul>
      </header> );
}

export default Header;