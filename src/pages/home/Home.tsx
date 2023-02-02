import React from 'react';
import styled from 'styled-components';
import BenevoleList from '../../components/benevoleList/BenevoleList';
import JeuList from '../../components/jeuList/JeuList';


const StyledHome = styled.div`

    height: 100%;
    width: 100%;

`

const Home = () => {
    return (
        <StyledHome>
            <h1>HOME</h1>
            <BenevoleList></BenevoleList>
            <JeuList></JeuList>
        </StyledHome>
    );
};

export default Home;