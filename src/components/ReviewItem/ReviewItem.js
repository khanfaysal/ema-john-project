import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name,quantity,seller,key,price} = props.product;
    const reviewItemStyle = {
        borderBottom: '2px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewItemStyle } className = 'review-item'>
            <h3 className = 'product-name'>Product Name: {name}</h3>
            <h3>Seling By: {seller}</h3>
            <p>Product Qty: {quantity}</p>
            <p><small>Per Product Price: ${price}</small></p>
            <br/>
            <button 
                className = 'product-button'
                onClick = {() =>props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;