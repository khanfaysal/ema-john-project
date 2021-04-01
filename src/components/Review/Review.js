import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// import fakeData from '../../fakeData/index.js';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager.js';
import Cart from '../Cart/Cart.js';
import Product from '../Product/Product.css'
import ReviewItem from '../ReviewItem/ReviewItem.js';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';
const Review = () => {

   const [cart, setCart] = useState([]);
   const [orderPlaced, setOrderPlaced] = useState(false);
   const history = useHistory()
   const handleProceedCheckout   = () =>{
       history.push('./shipment');
   }
   const removeProduct = (productKey) => {
       const newCart = cart.filter(prod => prod.key !== productKey);
       setCart(newCart);
       removeFromDatabaseCart(productKey);
   }
   useEffect(()=>{
       const saveCart = getDatabaseCart();
       const productKeys = Object.keys(saveCart);
       fetch('http://localhost:5000/productsByKeys', {
           method: 'POST',
           headers: {
               'Content-Type':'application/json'
           },
           body:JSON.stringify(productKeys)
       })
       .then(res =>res.json())
       .then(data =>setCart(data))

    }, []);
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    } 
    return (
        <div className = 'twin-container'>
            <div className = 'product-container'>
            {
                cart.map(prod => <ReviewItem
                    key = {prod.key}
                    removeProduct = {removeProduct}
                    product = {prod}></ReviewItem>)
            }
            {thankYou}
           
            </div>
            <div className='cart-container'>
                <Cart cart= {cart}>
                    <button onClick = {handleProceedCheckout} className = 'product-button'>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;