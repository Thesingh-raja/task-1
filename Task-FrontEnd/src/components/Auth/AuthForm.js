import { useState, useRef, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async(event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);

    await fetch('http://localhost:4444/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': '10000'
      },
      body: JSON.stringify({
        email: enteredEmail,
         password : enteredPassword 
      })
    }).then((res) => {
        console.log(res)
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            throw new Error(data.message);
          })}
        }).then((data) => {
        console.log(data)
        authCtx.login(data.token);
        if(data.role==='user') history.replace('/profile')
        else if(data.role==='admin') history.replace('/admin')
      }).catch((err) => alert(err))
}

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>Login</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <Link to="/register" className={classes.register}>Create new account</Link>

        </div>
      </form>
    </section>
  );
};

export default AuthForm;