import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from 'styled-components';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../config/firebase-config";

const StyledLogin = styled.div`
  .login {
    height: 100vh;
    width: 100vw;
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
  }
  .login__textBox {
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .login__btn {
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
    border: none;
    color: white;
    background-color: black;
  }
  .login__google {
    background-color: #4285f4;
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


