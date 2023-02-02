import React from 'react';
import styled from 'styled-components';
import Jeu from '../../interfaces/jeu';

const StyledJeuItem = styled.div`

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;

`

const JeuItem = (props : Jeu) => {
    return (
        <StyledJeuItem>
                <div>{props.nom}</div>
                <div>{props.type.nom}</div>
        </StyledJeuItem>
    );
};

export default JeuItem;