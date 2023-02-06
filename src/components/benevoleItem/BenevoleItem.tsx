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
          height: 40px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background-color: ${props => props.selected ? "cyan" : "#3655b3"};
          color: ${props => props.selected ? "#884DFF" : "white"};
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
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70%;
          margin-right: 25%;
          background-color: ${props => props.isClicked ? "cyan" : "#3655b3"};
          color: ${props => props.isClicked ? "#884DFF" : "white"}
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
            <div className="benevInfo" onClick={() => {setBenevoleToModif(benevole)}}>
                <div>{benevole.nom}</div>
                <div>{benevole.prenom}</div>
                <div>{benevole.email}</div>
                <div>{zone?.nom}</div>
            </div>
            <div className="creneauRelated">
                {
                    heureDebut ?
                    <div className="creneau"
                         onClick={()=>handleClickCreneau()}>
                        {heureDebut.toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                      }) + formatDate(heureDebut) + " - " + formatDate(heureFin!)}
                    </div>
                    :
                    <div></div>
                }
                <div onClick={()=>setBenevoleToLink(benevole)} className="addCrenButton">+</div>
                </div>
        </StyledBenevoleItem>
    );
};

export default BenevoleItem;