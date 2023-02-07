import React, { useState } from 'react';
import styled from 'styled-components';
import BenevoleList from '../../components/benevoleList/BenevoleList';
import JeuList from '../../components/jeuList/JeuList';



interface StyledHomeProps {
    isJeuProps: boolean;
    }

const StyledHome = styled.div<StyledHomeProps>`
  
    height: 100%;
    width: 60%;
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

        .benevoleButton{
            background-color: ${props => props.isJeuProps ? "white" : "#884DFF"};
            width: 100%;
            text-align: center;
            font-weight: bold;

            :hover{
                cursor: pointer;
            }

        }

        .jeuButton{
            background-color: ${props => props.isJeuProps ? "#36b3b3" : "white"};
            width: 100%;
            text-align: center;
            font-weight: bold;

            :hover{
                cursor: pointer;
            }
        }
    }

    .title{
        color: #4d4dff;
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