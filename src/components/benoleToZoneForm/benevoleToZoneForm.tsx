import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker'
import { NumericStepper } from '@anatoliygatt/numeric-stepper';
import Select from 'react-select'

import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components';
import axios from "axios";
import Benevole from "../../interfaces/benevole";
import Zone from "../../interfaces/zone"
import Creneau from '../../interfaces/creneau';
import CreneauSelector from "../creneauSelector/CreneauSelector";
import {Button} from "@mui/material";


interface StyledProps {
    isErrMsg: boolean;
}

const StyledForm = styled.div<StyledProps>`
    
    padding: 1%;
    border-radius: 5px;
    width: 500px;
    margin-top: 1%;
    margin-left: 1%;
    border: solid 1px lightgray;
  
    #infoText{
      font-size: 14px;
      margin-bottom: 7px;
      margin-left: 2px;
      color: ${props=>props.isErrMsg ? "red" : "green"}
    }
  
    .selection > *{
      margin-bottom: 1%;
    }
  
    #zoneSelection{
      margin-top: 1%;
      width: 500px;
    }
  
    #submitButt{
      margin-top: 5px;
    }
  
    #buttons{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-right: 1%;
    }
  
    p{
      font-family: "Roboto","Helvetica","Arial",sans-serif;
      font-weight: 500;
      font-size: 1rem;
    }
  
`

interface Option {
    value: Zone;
    label: String;
}

interface Props{
    benevole : Benevole
    zones : Zone[]
    setBenevoleToLink: (benevole : Benevole | undefined) =>void;
    addCreneauList: (newCreneau : Creneau) =>void;
}

const BenevoleToZoneForm : React.FC<Props> = ({benevole, zones, setBenevoleToLink, addCreneauList}) => {

    const [confirmationText, setConfirmationText] = useState("")
    const [zone, setZone] = useState<Option | null>(null);
    const [isErrMsg, setErrMsg] = useState(false);
    const [selectedCreneau, setSelectedCreneau] = useState<{debut : number, fin : number}>({
        debut: new Date().setHours(0,0,0,0),
        fin : new Date().setHours(23,0,0,0),
    })

    let zoneOptions : Option[] = []
    zones.forEach(zone=>{
        zoneOptions.push({
            value: zone,
            label: zone.nom
        })
    })

    const cancelModification = () =>{
        setBenevoleToLink(undefined);
    }

    const onSubmit = (e:any) => {
        e.preventDefault()
        if(zone!==null){
            axios.patch(process.env.REACT_APP_API_URL + "zones/addBenevoleTo/" + zone!.value._id, {
                heureDebut: new Date(selectedCreneau.debut).toJSON(),
                heureFin: new Date(selectedCreneau.fin).toJSON(),
                benevole: benevole._id
            }).then((resp) => {
                if (resp.status === 200) {
                    addCreneauList({
                        benevole: benevole,
                        debut: new Date(selectedCreneau.debut),
                        fin: new Date(selectedCreneau.fin),
                        zone: zone.value!
                    })
                    setErrMsg(false)
                    setConfirmationText("Le bénévole a bien été ajouté au créneau saisi sur la zone sélectionnée !")
                    setBenevoleToLink(undefined)
                }
            }).catch((err)=>{
                setErrMsg(true)
                if(err.response){
                    setConfirmationText("Erreur : " + err.response.data.message);
                } else{
                    setConfirmationText(err.request);
                }
            })
        } else{
            setErrMsg(true)
            setConfirmationText("Veuillez saisir un zone");
        }
    }

    return (
        <StyledForm isErrMsg={isErrMsg}>
            <div id="benevRemind">
                <p>Ajout de créneau pour : {benevole.nom} {benevole.prenom}</p>
            </div>
            <form onSubmit={onSubmit}>
                <div className="selection">
                    <Select id="zoneSelection"
                            placeholder="Sélectionner une zone"
                            required
                            options={zoneOptions}
                            onChange={(selected)=>(setZone(selected))}
                    />
                    <CreneauSelector setSelectedCreneau={setSelectedCreneau}/>
                </div>
                <div id="buttons">
                    <Button
                        id="submitButt"
                        variant="contained"
                        size="small"
                        type="submit"
                    >Affecter au créneau
                    </Button>
                    <Button
                        onClick={() => {cancelModification()}}>
                        Annuler
                    </Button>
                </div>
            </form>
            <p id="infoText">{confirmationText}</p>
        </StyledForm>
    )
}

export default BenevoleToZoneForm;



