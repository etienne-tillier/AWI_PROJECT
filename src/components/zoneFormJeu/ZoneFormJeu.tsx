import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button} from "@mui/material";
import Jeu from "../../interfaces/jeu";
import Select from "react-select";
import Zone from "../../interfaces/zone";

const StyledForm = styled.div`

    padding: 1%;
    border-radius: 5px;
    width: 600px;
    margin-top: 1%;
    margin-left: 1%;
    border: solid 1px lightgray;
  
    >*{
      margin-bottom: 1%;
    }
  
    #buttons{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-right: 1%;
        margin-left: 3px;
        align-items: center;
    }
  
    .reminder{
      font-family: "Roboto","Helvetica","Arial",sans-serif;
      font-weight: 500;
      font-size: 1rem;
      margin-left: 3px;
    }
`

interface Props{
    jeux : Jeu[];
    selectedZone : Zone|undefined;
    setSelectedZone : (zone: Zone|undefined) => void;
}

interface Options{
    value : Jeu,
    label : String
}

const ZoneFormJeu : React.FC<Props> = ({jeux, selectedZone, setSelectedZone}) =>{

    const [jeuxOptions, setJeuxOptions] = useState<Options[]>([])
    const [selectedJeu, setSelectedJeu] = useState<Jeu|undefined>(undefined)

    useEffect(()=>{
        fillOptions();
    }, [])

    const fillOptions = () =>{
        let aux : Options[] = []
        jeux.forEach(jeu=>{
            aux.push({value : jeu, label : jeu.nom})
        })
        setJeuxOptions(aux);
    }

    const addJeuToZone = () =>{
        if(setSelectedJeu !== undefined){

        }
    }

    return (
        <StyledForm>
            <div className="reminder">Affecter des jeux à la zone {selectedZone?.nom}</div>
            <Select
                id="selectJeux"
                options={jeuxOptions}
                onChange={(value)=>setSelectedJeu(value?.value as Jeu)}
                placeholder="Sélectionner des jeux"
            />
            <div id="buttons">
                <Button
                   variant="contained"
                    size="small"
                   onClick={()=>addJeuToZone()}
                >
                    Sauvegarder
                </Button>
                <Button onClick={()=>setSelectedZone(undefined)}>Annuler</Button>
            </div>
        </StyledForm>
    )
}

export default ZoneFormJeu