import { useState, useRef, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './RegisterForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async(event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPasswordConfirm = passwordConfirmInputRef.current.value;
    setIsLoading(true);
    
    await fetch('http://localhost:4444/api/v1/users/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': '10000'
      },
      body: JSON.stringify({
          name: enteredName,
        email: enteredEmail,
         password : enteredPassword,
         passwordConfirm: enteredPasswordConfirm

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
        history.replace('/profile');
      }).catch(() => alert('This mailId is already registered'))
}

  return (
    <section className={classes.auth}>
      <h1>Create Account</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='name' id='name' required ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Enter Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='passwordConfirm'>Retype Password</label>
          <input
            type='password'
            id='passwordConfirm'
            required
            ref={passwordConfirmInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>Sign Up</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <Link to="/auth" className={classes.register}>Already have an account?</Link>

        </div>
      </form>
    </section>
  );
};

export default AuthForm;