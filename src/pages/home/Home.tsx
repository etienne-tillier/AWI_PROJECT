import React, { useState } from 'react';
import styled from 'styled-components';
import BenevoleList from '../../components/benevoleList/BenevoleList';
import JeuList from '../../components/jeuList/JeuList';

import Logo from "../../images/logo.png"



interface StyledHomeProps {
    isJeuProps: boolean;
    }

const StyledHome = styled.div<StyledHomeProps>`
  
    height: 100%;
    width: 60%;
    margin-top: 2px;
    margin-left: 20%;
    margin-right: 20%;

    @media screen and (max-width: 1200px) {
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
    }
    @media screen and (max-width: 900px) {
      width: 98%;
      margin-left: 1%;
      margin-right: 1%;
    }

    .menu{
        width: 50%;
        height: 10%;
        border: solid 1px black;
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;

        .benevoleButton{
            background-color: ${props => props.isJeuProps ? "white" : "#884DFF"};
            width: 100%;
            text-align: center;
            font-weight: bold;
            transition: 0.2s;

            :hover{
                cursor: pointer;
            }

        }

        .jeuButton{
            background-color: ${props => props.isJeuProps ? "#36b3b3" : "white"};
            width: 100%;
            text-align: center;
            font-weight: bold;
            transition: 0.2s;

            :hover{
                cursor: pointer;
            }
        }
    }

    .title{
        color: #4d4dff;
    }
  
  #header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
            <div id="header">
                <img src={Logo} height="65
                px"/>
                <div className="menu">
                    <div className="benevoleButton" onClick={handleBenevoleButton}>Bénevoles</div>
                    <div className="jeuButton" onClick={handleJeuButton}>Jeux</div>
                </div>
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