import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const product = (props) => {
    const {img,name,seller,price,stock} = props.product;
    // console.log(props);
    return (
        <div className = "product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div className = 'product-name'>
                <h3>{name}</h3>
                <p><small>by: {seller}</small></p>
                <h4>${price}</h4>
                <p><small>only {stock} left in stock - order soon</small></p>
                <button className = 'product-button' onClick = {()=>props.handleAddProduct(props.product)}>
                <FontAwesomeIcon icon={faShoppingCart} />add to cart </button>
            </div>
           
        </div>
    );
};

export default product;