
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
import HomeScreen from './Screens/HomeScreen';
import Login from './Screens/LoginScreen';
import ProductDetails from './Screens/ProductDetails';
import WelcomeScreen from './Screens/WelcomeScreen';
import { Cart } from './Screens/Cart';
import { Categories } from './Screens/Categories';
import Checkout from './Screens/CheckOut';
import ErrorScreen from './Screens/ErrorScreen';
import Orders from './Screens/Orders';
import OrderDetails from './Screens/OrderDetails';
import ECoin from './Screens/E-coin';
import { useEffect, useState } from 'react';
// import Admin from './Screens/Admin';
// import AddProduct from './Screens/AddProduct';

function App() {
 
  const  [Token,setToken]=useState(localStorage.getItem("Token"))
  useEffect(()=>{

  },[Token])
console.log('dfdfd',Token);
  return (
    <div className="App">
     <BrowserRouter>
             <Routes>

             {Token ? (
              <>
                 {/* <Route path="/admin-addProduct" element={ <AddProduct />}/> */}
                 <Route path="/categories" element={ <Categories />}/>
                 <Route path="/checkout" element={ <Checkout />}/>
                 <Route path="/order-Details" element={ <Orders />}/>
                 <Route path="/order-details/:orderId" element={ <OrderDetails />}/>
                 <Route path="/e-coin" element={ <ECoin />}/>
              
              </>):(
                <>
                <Route path="/cart" element={ <Cart />}/>
                 <Route exact path="/*"  element={ <WelcomeScreen />}/>  
                <Route path="/home" element={ <HomeScreen />}/>
                <Route path="/login-signup" element={ <Login />}/> 
                <Route path="/product-details/:id" element={ <ProductDetails />}/>

                </>
              )}

                {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/*" element={<ErrorScreen />}></Route>
                


             </Routes>
            </BrowserRouter>
    </div>
  );
}

export default App;
