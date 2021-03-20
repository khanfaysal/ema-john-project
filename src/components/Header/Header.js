import React, { UseContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App.js';
import logo from '../../images/logo.png';
import './Header.css';

const header = () => {
    const [logInUser, setLogInUser] = UseContext(UserContext);
    return (
        <div className ="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to ="/shop">Shop</Link>
                <Link to ="/review">Order Review</Link>
                <Link to ="/inventory">Manage Inventory</Link>
               <button onClick = {() =>setLogInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default header;