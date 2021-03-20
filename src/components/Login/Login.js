
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { useContext, useState } from 'react';
import { UserContext } from "../../App.js";
import { useHistory, useLocation } from "react-router";


if( firebase.apps.length === 0 ){
  firebase.initializeApp(firebaseConfig);
}

function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user , setUser] = useState({
    isSignIn: false,
    name : '',
    email: '',
    photo: '',
    password: '',
    error: '',
    success: '',
  });
    //   context api use part
    const [logInUser, setLogInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
   // total form controlling function 
   const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
        
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLogInUser(newUserInfo);
        history.replace(from);
        console.log('sign in user info',res.user);
      })
        .catch((error) => {
          const newUserInfo = {...user};
        // newUserInfo[error] = e.target.value;
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
        });
    }
    e.preventDefault();
  }
  // update user name code part
  const updateUserName = name => {
    const user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name
        }).then(function() {
          console.log('user name update successfully');
        }).catch(function(error) {
          console.log(error);
        });
  }
  // input change function
  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      const isUpperCaseLetter = (/[A-Z]/.test(e.target.value));
      isFieldValid = isPasswordValid && passwordHasNumber && isUpperCaseLetter;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      
    }
  }
 
  return (
    <div style ={{textAlign: "center"}}>
     <h1>User Email And Password Authentication</h1>
     <input type="checkbox" onChange = {() => setNewUser(!newUser)} name="newUser" id=""/>
     <label htmlFor="newUser">For New User SignUp</label><br/><br/>
     <form onSubmit = {handleSubmit}>
       {newUser && <input type="text" onBlur = {handleBlur} name="name" id="" placeholder = "Your name" required/>}&nbsp;&nbsp;
       <input type="text" onBlur = {handleBlur} name="email" id="" placeholder ="Type your email" required/> &nbsp;&nbsp;
       <input type="password" onBlur = {handleBlur} name="password" id="" placeholder ="Type your password" required/> <br/><br/>
       <input type="submit" value= {newUser ? "Sign Up":"Sign In"}/>
     </form>
     <p style = {{color: 'red'}}>{user.error}</p>
     {
       user.success && <p style = {{color: 'green'}}>user {newUser ? 'created':'Log In'} successfully</p>
     }
    </div>
  );
}

export default Login;
