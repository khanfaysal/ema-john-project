import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App.js';
import { getDatabaseCart } from '../../utilities/databaseManager.js';
import './Shipment.css'
const Shipment = () => {
  
    const [logInUser, setLogInUser] = useContext(UserContext);
    const onSubmit = data => {
        const saveCart = getDatabaseCart();
        const orderDetails = {...logInUser, products: saveCart, shipment: data, orderTime: new Date()}
        fetch('http://localhost:5000/addOrder',{
          method: 'POST',
          header: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(orderDetails)
        })
        .then(res =>res.json())
        .then(data =>{
          console.log(data)
          if(data){
            alert('Your order placed successfully');
          }
        })
    };
    console.log(watch("example"));

  return (
    <form className ='ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue = {logInUser.name} ref={register({ required: true })} placeholder ="Your Name" />
      {errors.name && <span className ='error'>Name is required</span>}

      <input name="email" defaultValue = {logInUser.email} ref={register({ required: true })} placeholder ="Your Email" />
      {errors.email && <span className ='error'>Email is required</span>}

      <input name="address" ref={register({ required: true })} placeholder ="Your Address" />
      {errors.address && <span className ='error'>Address is required</span>}

      <input name="phone" ref={register({ required: true })} placeholder ="Your Phone Number" />
      {errors.phone && <span className ='error'>phone is required</span>}
      <input type="submit" />
    </form>
  );
};
export default Shipment;