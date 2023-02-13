import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import Benevole from '../../interfaces/benevole';
import Creneau from "../../interfaces/creneau";
import Zone from "../../interfaces/zone";


interface StyledProps {
    isClicked: boolean;
    selected: boolean;
}

const StyledBenevoleItem = styled.div<StyledProps>`
  
        text-align: left;
        border-bottom: solid 1px;
        border-bottom-color: grey;
        margin-left: 3%;
        margin-right: 5%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 70px;

        @media screen and (max-width: 400px) {
          height: 100px;
        }
  
        .benevInfo:hover, .creneau:hover{
          cursor: pointer;
          opacity: 0.9;
        }
  
        .benevInfo:hover{
          background-color: ${props => props.selected ? "#bfcfff" : "#4662B7"};
        }
  
        .creneau:hover{
          background-color: ${props => props.isClicked ? "#bfcfff" : "#4662B7"};
        }
  
        .benevInfo{
          background-color: ${props => props.selected ? "#bfcfff" : "#3655b3"};
          color: ${props => props.selected ? "#884DFF" : "white"};
          padding-right: 0;
        }
  
        .creneau{
          background-color: ${props => props.isClicked ? "#bfcfff" : "#3655b3"};
          color: ${props => props.isClicked ? "#884DFF" : "white"}
        }
        
        .creneau, .benevInfo{
          padding-left: 2px;
          border-radius: 3px;
          height: 25px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: left;
          gap: 2%;

          @media screen and (max-width: 400px) {
            height: 45px;
          }
        }

        .addCrenButton{
          font-weight: bold;
          font-size: 26px;
          text-align: center;
          padding-left: 1%;
          padding-right: 1%;
        }
  
        .addCrenButton:hover{
          cursor: pointer;
        }
        
        .benevole{
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: left;
          gap: 5px;
        }
  
        .name{
          font-weight: bold;
        }
`

interface Props {
    benevole : Benevole;
    zone : Zone | undefined;
    heureDebut : Date | undefined;
    heureFin : Date | undefined;
    setBenevoleToModif : (benevole : Benevole | undefined) => void;
    setBenevoleToLink: (benevole : Benevole | undefined) =>void;
    setCreneauToRemove: (creneau : Creneau | undefined)=>void;
    selected : boolean;
    creneau:Creneau|undefined;
}

const formatDate = (date : Date) => {
    return date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit"
      });
}


const BenevoleItem : React.FC<Props> = ({benevole, zone, heureDebut, heureFin, setBenevoleToModif, setBenevoleToLink, setCreneauToRemove, creneau, selected}) => {

    const [clicked, setClicked] = useState(creneau?.benevole._id===benevole._id && creneau?.debut.getTime()===heureDebut?.getTime());

    useEffect(()=>{
        setClicked(creneau?.benevole._id===benevole._id && creneau?.debut.getTime()===heureDebut?.getTime())
    }, [creneau])

    const handleClickCreneau = () => {
        setCreneauToRemove({benevole: benevole, debut: heureDebut!, fin:heureFin!, zone:zone!})
    };

    return (
        <StyledBenevoleItem isClicked={clicked} selected={selected}>
            <div className="benevole">
                <div className="benevInfo" onClick={() => {setBenevoleToModif(benevole)}}>
                    <div className="name">{benevole.nom.toUpperCase()} {benevole.prenom.charAt(0).toUpperCase()+benevole.prenom.slice(1, benevole.prenom.length)}</div>
                    <div>-</div>
                    <div>{benevole.email}</div>
                </div>
                <div className="creneauRelated">
                    {
                        heureDebut ?
                        <div className="creneau"
                             onClick={()=>handleClickCreneau()}>
                            {"Le " + heureDebut.toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                          }) + " de " + formatDate(heureDebut) + " à " + formatDate(heureFin!)}
                            <div>-</div>
                            <div>{zone?.nom}</div>
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </div>
            <div onClick={()=>setBenevoleToLink(benevole)} className="addCrenButton">+</div>
        </StyledBenevoleItem>
    );
};

export default BenevoleItem;