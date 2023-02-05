import React from 'react';
import styled from "styled-components"
import Benevole from '../../interfaces/benevole';


const StyledBenevoleItem = styled.div`

        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: left;
        height: 40px;
        border-bottom: solid 1px;
        border-bottom-color: grey;
        border-radius: 5px;
        margin-right: 2%;
        padding-left: 2%;
        padding-right: 2%;
        position:relative;
  
        .benevInfo:hover, .creneau:hover{
          cursor: pointer;
          background-color: cyan;
          color:#884DFF;
          height: 40px;
        }
  
        .benevInfo{
          width: 70%;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-right: 0;
          gap: 9%;
        }
  
        .benevInfo > *{
          width: 150px;
          text-align: center;
        }
  
        .creneauRelated{
          width: 22%;
          display: flex;
          flex-direction: row;
          align-items: center;
          right: 2%;
          position:absolute;
        }
  
        .creneau{
          text-align: center;
          width: 70%;
          margin-right: 25%;
        }

        .addCrenButton{
          font-weight: bold;
          font-size: 22px;
          font-size: 22px;
          text-align: center;
          padding: 0;
        }
  
        .addCrenButton:hover{
          cursor: pointer;
        }
`

interface Props {
    benevole : Benevole;
    nomZone : String | undefined;
    heureDebut : Date | undefined;
    heureFin : Date | undefined;
    setBenevoleToModif : (benevole : Benevole | undefined) => void;
    setBenevoleToLink: (benevole : Benevole | undefined) =>void;
}

const formatDate = (date : Date) => {
    return date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit"
      });
}


const BenevoleItem : React.FC<Props> = ({benevole, nomZone, heureDebut, heureFin, setBenevoleToModif, setBenevoleToLink}) => {
    return (
        <StyledBenevoleItem onClick={() => {setBenevoleToModif(benevole)}}>
            <div className="benevInfo">
                <div>{benevole.nom}</div>
                <div>{benevole.prenom}</div>
                <div>{benevole.email}</div>
                <div>{nomZone}</div>
            </div>
            <div className="creneauRelated">
                {
                    heureDebut ?
                    <div className="creneau">{heureDebut.toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                      }) + formatDate(heureDebut) + " - " + formatDate(heureFin!)}</div>
                    :
                    <div>{" - "}</div>
                }
                <div onClick={()=>setBenevoleToLink(benevole)} className="addCrenButton">+</div>
                </div>
        </StyledBenevoleItem>
    );
};

export default BenevoleItem;