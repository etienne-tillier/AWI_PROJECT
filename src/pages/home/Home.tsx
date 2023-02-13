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
    width: 64%;
    margin-top: 2px;
    margin-left: 22%;
    margin-right: 22%;

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
        height: 35px;
        border: 1px solid lightgray;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 1%;

      @media screen and (max-width: 500px) {
        width: 65%;
      }
      @media screen and (max-width: 350px) {
        width: 70%;
      }
      
        .jeuButton{
          background-color: ${props => props.isJeuProps ?  "#69B2DF":"white" };
          color: ${props => props.isJeuProps ?  "#9A254C":"black"};
        }
        
        .benevoleButton{
          background-color: ${props => props.isJeuProps ?  "white":"#69B2DF" };
          color: ${props => props.isJeuProps ?  "black":"#9A254C" };
        }
      
        >*{
          font-size: 1.5em;
          width: 100%;
          text-align: center;
          font-weight: bold;
          transition: 0.2s;
          border-radius: 5px;
          height: 100%;
          
          :hover{
            cursor: pointer;
            opacity: 0.8;
          }
        }
    }

    #globalLogo{
      margin-left: 2px;
    }
  
  #header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid lightgray;
    border-radius: 5px;
    border-top: hidden;
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
                <img id="globalLogo" src={Logo} height="65px"/>
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