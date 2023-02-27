import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {auth, registerWithEmailAndPassword, signInWithGoogle,} from "../../config/firebase-config";
import styled from 'styled-components';
import exp from "constants";

const StyledRegister = styled.div`
  .register {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .register__container {
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: #dcdcdc;
    padding: 30px;
  }
  .register__textBox {
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .register__btn {
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
    border: none;
    color: white;
    background-color: black;
  }
  .register__google {
    background-color: #4285f4;
  }
  .register div {
    margin-top: 7px;
  }
`

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const register = () => {
        if (!name) alert("Veuillez saisir un nom d'utilisateur");
        registerWithEmailAndPassword(name, email, password);
    };
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    }, [user, loading]);
    return (
        <StyledRegister>
            <div className="register">
                <div className="register__container">
                    <input
                        type="text"
                        className="register__textBox"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nom"
                    />
                    <input
                        type="text"
                        className="register__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                    />
                    <input
                        type="password"
                        className="register__textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />
                    <button className="register__btn" onClick={register}>
                        S'inscrire
                    </button>
                    <button
                        className="register__btn register__google"
                        onClick={signInWithGoogle}
                    >
                        S'inscrire avec Google
                    </button>
                    <div>
                        Déjà inscrit ? <Link to="/">Connectez-vous</Link> maintenant.
                    </div>
                </div>
            </div>
        </StyledRegister>
    );
}

export default Register;



