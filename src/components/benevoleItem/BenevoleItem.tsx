import React from 'react';
import styled from "styled-components"
import Benevole from '../../interfaces/benevole';


const StyledBenevoleItem = styled.div`

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
`

interface Props {
    benevole : Benevole;
    nomZone : String | undefined;
    heureDebut : Date | undefined;
    heureFin : Date | undefined;
    setBenevoleToModif : (benevole : Benevole | undefined) => void;
}

const formatDate = (date : Date) => {
    return date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit"
      });
}


const BenevoleItem : React.FC<Props> = ({benevole, nomZone, heureDebut, heureFin, setBenevoleToModif}) => {
    return (
        <StyledBenevoleItem>
                <div>{benevole.nom}</div>
                <div>{benevole.prenom}</div>
                <div>{benevole.email}</div>
                <div>{nomZone}</div>
                {
                    heureDebut ? 
                    <div>{heureDebut.toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                      }) + formatDate(heureDebut) + " - " + formatDate(heureFin!)}</div>
                    :
                    <div>{" - "}</div>
                }

                <div>+</div>
                <div onClick={() => {setBenevoleToModif(benevole)}}>modif</div>
        </StyledBenevoleItem>
    );
};

export default BenevoleItem;