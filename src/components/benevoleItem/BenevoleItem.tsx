import React from 'react';
import styled from "styled-components"
import Benevole from '../../interfaces/benevole';


const StyledBenevoleItem = styled.div`

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
`


const BenevoleItem = (props : Benevole) => {
    return (
        <StyledBenevoleItem>
                <div>{props.nom}</div>
                <div>{props.prenom}</div>
                <div>{props.email}</div>
        </StyledBenevoleItem>
    );
};

export default BenevoleItem;