import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart.js';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager.js';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products , setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCart = productKeys.map(existingKey =>{
            const product = fakeData.find(prod => prod.key === existingKey);
            product.quantity = saveCart[existingKey]
            return product;
        })
        setCart(previousCart);   
     }, []);
    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(prod => prod.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(prod => prod.key !== toBeAddedKey);
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }
    
    return (
        <div className = "twin-container">
            <div className="product-container">
                {
                    products.map(prod => <Product
                    key = {prod.key}
                    showAddToCart = {true}
                    handleAddProduct = {handleAddProduct}
                    product = {prod}>
                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}>
                    <Link to = '/review'>
                        <button class ='product-button'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;