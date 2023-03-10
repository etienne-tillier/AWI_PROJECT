import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../../config/firebase-config";
import styled from 'styled-components';
import Logo from "../../images/logo.png"

const StyledReset = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  
  .reset {
    margin-bottom: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .reset__container {
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: #dcdcdc;
    padding: 30px;
    border-radius: 5px;
  }
  .reset__textBox {
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
    border-radius: 3px;
  }
  .reset__btn {
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
    border: none;
    color: white;
    background-color: black;
    border-radius: 3px;
  }
  .reset div {
    margin-top: 7px;
  }
`

const Reset = () =>{
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    }, [user, loading]);
    return (
        <StyledReset>
            <img id="globalLogo" src={Logo} height="150px"/>
            <div className="reset">
                <div className="reset__container">
                    <input
                        type="text"
                        className="reset__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                    />
                    <button
                        className="reset__btn"
                        onClick={() => sendPasswordReset(email)}
                    >
                        Envoyer l'email de r??initialisation
                    </button>
                    <div>
                        Pas encore inscrit ? <Link to="/register">Incrivez-vous</Link> d??s maintenant.
                    </div>
                </div>
            </div>
        </StyledReset>
    );
}

export default Reset;


