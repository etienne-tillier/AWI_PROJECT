import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from 'styled-components';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../config/firebase-config";
import Logo from "../../images/logo.png"
import Loader from "../../components/loader/loader";


const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  
  .login {
    margin-bottom: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login__container {
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: #dcdcdc;
    padding: 30px;
    border-radius: 5px;
  }
  .login__textBox {
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
    border-radius: 3px;
  }
  .login__btn {
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
    border: none;
    color: white;
    background-color: black;
    border-radius: 3px;
    :hover{
      cursor: pointer;
      opacity: 0.9;
    }
  }
  .login__google {
    background-color: #4285f4;
    border-radius: 3px;
    :hover{
      cursor: pointer;
      opacity: 0.9;
    }
  }
  .login div {
    margin-top: 7px;
  }
`

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // loading screen ?
            return;
        }
        if (user) navigate("/home");
    }, [user, loading]);
    return (
        <StyledLogin>
            <img id="globalLogo" src={Logo} height="150px"/>
            <div className="login">
                <div className="login__container">
                    <input
                        type="text"
                        className="login__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                    />
                    <input
                        type="password"
                        className="login__textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />
                    <button
                        className="login__btn"
                        onClick={() => logInWithEmailAndPassword(email, password)}
                    >
                        Connexion
                    </button>
                    <button className="login__btn login__google" onClick={signInWithGoogle}>
                        Connectez vous avec Google
                    </button>
                    <div>
                        <Link to="/reset">Mot de passe oublié</Link>
                    </div>
                    <div>
                        Pas encore inscrit ? <Link to="/register">S'inscrire</Link> maintenant.
                    </div>
                </div>
            </div>
        </StyledLogin>
    );
}

export default Login;


