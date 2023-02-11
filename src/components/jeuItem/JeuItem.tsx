import React from 'react';
import styled from 'styled-components';
import Jeu from '../../interfaces/jeu';
import editLogo from "./../../images/edit_logo.svg";


interface StyledProps {
    selected: boolean;
}

const StyledJeuItem = styled.div<StyledProps>`

        display: grid;
        grid-template: "a b";
        grid-template-columns: 80% 20%;;
        align-content: center;
        width: 100%;
        height: 50px;
        margin-left: 4%;
  
        .jeuInfo{
          display: grid;
          grid-template: "a b";
          grid-template-columns: 40% 40%;
          align-content: center;
          justify-content: flex-start;
          height: 50px;
          margin-right: 2%;
          padding-left: 2%;
          border-radius: 3px;
          background-color: ${props => props.selected ? "#bfcfff" : "#3655b3"};
          color: ${props => props.selected ? "#884DFF" : "white"};
        }
  
        .jeuInfo:hover{
          cursor: pointer;
          opacity: 0.9;
          background-color: ${props => props.selected ? "#bfcfff" : "#4662B7"};
        }
  
        #addToZoneButton{
          margin-top: auto;
          margin-bottom: auto;
          text-align: right;
        }
  
        .jeuName{
          font-weight: bold;
        }
  
        #addToZoneButton{
          font-weight: bold;
          font-size: 26px;
          text-align: center;
        }

        #addToZoneButton>img{
          height: 26px;
          filter: invert(100%) sepia(0%) saturate(2594%) hue-rotate(181deg) brightness(107%) contrast(90%);;
        }
        #addToZoneButton>img:hover{
          cursor: pointer;
          opacity: 0.8;
        }

`

interface Props{
    jeu: Jeu;
    selectedJeu : Jeu | undefined;
    setJeuToAdd: (jeuToAdd : Jeu | undefined)=> void;
    setJeuToModif : (jeuToModif : Jeu|undefined) => void;
}

const JeuItem : React.FC<Props> = ({jeu, selectedJeu, setJeuToModif, setJeuToAdd}) => {


    return (
        <StyledJeuItem selected={selectedJeu!==undefined && selectedJeu._id===jeu._id}>
            <div className="jeuInfo" onClick={()=>{setJeuToModif(jeu)}}>
                <div className="jeuName">{jeu.nom.charAt(0).toUpperCase() + jeu.nom.slice(1, jeu.nom.length)}</div>
                <div>{jeu.type.nom}</div>
            </div>
            <div id="addToZoneButton" onClick={()=>setJeuToAdd(jeu)}><img src={editLogo} alt="Edit Button"/></div>
        </StyledJeuItem>
    );
};

export default JeuItem;