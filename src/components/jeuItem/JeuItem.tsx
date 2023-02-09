import React from 'react';
import styled from 'styled-components';
import Jeu from '../../interfaces/jeu';


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
          //border-bottom: solid 1px;
          //border-bottom-color: grey;
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

        #addToZoneButton>p{
          width: 20px;
        }
  
        #addToZoneButton>p:hover{
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
            <div id="addToZoneButton" onClick={()=>setJeuToAdd(jeu)}><p>+</p></div>
        </StyledJeuItem>
    );
};

export default JeuItem;