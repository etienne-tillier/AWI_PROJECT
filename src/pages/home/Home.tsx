import React, { useState } from 'react';

import styled from 'styled-components';
import BenevoleList from '../../components/benevoleList/BenevoleList';
import JeuList from '../../components/jeuList/JeuList';


interface StyledHomeProps {
    isJeuProps: boolean;
    }

const StyledHome = styled.div<StyledHomeProps>`

    height: 100%;
    width: 100%;

    .menu{
        width: 50%;
        height: 10%;
        border: solid 1px black;
        display: flex;
        flex-direction: row;

        .benevoleButton{
            background-color: ${props => props.isJeuProps ? "white" : "red"};
            width: 100%;
            text-align: center;
            font-weight: bold;

            :hover{
                cursor: pointer;
            }

        }

        .jeuButton{
            background-color: ${props => props.isJeuProps ? "orange" : "white"};
            width: 100%;
            text-align: center;
            font-weight: bold;

            :hover{
                cursor: pointer;
            }
        }
    }

    .title{
        color: red;
    }

`



const Home = () => {

    const [isJeu, setIsJeu] = useState<boolean>(false)


    const handleBenevoleButton = () => {
        setIsJeu(false)
    }

    const handleJeuButton = () => {
        setIsJeu(true)
    }


    return (
        <StyledHome isJeuProps={isJeu}>
            <h1 className='title'>HOME</h1>
            <div className="menu">
                <div className="benevoleButton" onClick={handleBenevoleButton}>Bénevoles</div>
                <div className="jeuButton" onClick={handleJeuButton}>Jeux</div>
            </div>
            <div className="list">
                {isJeu ? 
                    <JeuList></JeuList>
                    :
                    <BenevoleList></BenevoleList>
                }
            </div>
        </StyledHome>
    );
};

export default Home;