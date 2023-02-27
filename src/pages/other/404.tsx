import styled from 'styled-components';
import {Link} from "react-router-dom";

import Logo from "../../images/logo.png"
import React from "react";

const StyledError = styled.div` 
    height:60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2%;
`

const Error404 = () =>{

    return(
        <StyledError>
            <h1>404</h1>
            <h3>Page introuvable</h3>
            <img id="globalLogo" src={Logo} height="200px"/>
            <Link to="/home">Retourner à la page principale</Link>
        </StyledError>
    )
}

export default Error404
