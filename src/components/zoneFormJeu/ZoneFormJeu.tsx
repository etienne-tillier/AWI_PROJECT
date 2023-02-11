import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button} from "@mui/material";
import Jeu from "../../interfaces/jeu";
import Select from "react-select";
import Zone from "../../interfaces/zone";
import axios from 'axios';
import { OptionsType } from 'react-select/lib/types';

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
    const [jeuxZone, setJeuxZone] = useState<Jeu[] | undefined>([])
    const [selectedJeu, setSelectedJeu] = useState<Options[] | null>(null)
    const [confirmationText, setConfirmationText] = useState("")

    useEffect(()=>{
        fillOptions();
        let aux : Jeu[] = []
        let auxOption : Options[] = []
        for (let jeu of selectedZone!.jeux){
            aux.push(jeu)
            auxOption.push({
                value: jeu,
                label: jeu.nom
            })
        }
        setSelectedJeu(auxOption)
        setJeuxZone(aux)
    }, [selectedZone])

    const fillOptions = () =>{
        let aux : Options[] = []
        jeux.forEach(jeu=>{
            aux.push({value : jeu, label : jeu.nom})
        })
        setJeuxOptions(aux);
    }

        /**
     * Get and return every new selected jeu to associate with the current Zone
     */
        const getJeuToAdd = () => {
            let addList : Jeu[] = []
            for (let jeuSelect of selectedJeu!){
                let check : boolean = true
                for (let jeu of selectedZone!.jeux){
                    if (jeu._id === jeuSelect.value._id){
                        check = false
                    }
                }
                if (check){
                    addList.push(jeuSelect.value)
                }
            }
            return addList
        }
    
        /**
         * Get and return every selected jeu to unlink from the current Zone
         */
        const getJeuToDel = () => {
            let delList : Jeu[] = []
            for (let jeuZone of jeuxZone!){
                let check : boolean = true
                for (let jeuSelect of selectedJeu!){
                    if (jeuSelect.value._id === jeuZone._id){
                        check = false
                    }
                }
                if (check){
                    delList.push(jeuZone)
                }
            }
            return delList
        }


        /**
     * Called when form is submitted
     * Associate new zones to the Jeu and remove the necessary ones
     * of the associated zone
     * @param e
     */
        const onSubmit = async (e : any) => {
            e.preventDefault()
            await add()
            await remove()
            setSelectedZone(undefined)
        }
    
        /**
         * Pushing every new associated game in the zone
         */
        const add = async () => {
            const jeuToAdd : Jeu[] = getJeuToAdd();
            for await (let jeu of jeuToAdd) {
                try {
                    await axios.patch(process.env.REACT_APP_API_URL + "zones/addJeuTo/" + selectedZone!._id,
                        {
                            jeu: jeu._id
                        }
                    )
                }catch (err){
                    setConfirmationText(err as string)
                }
            }
        }
    
        /**
         * Removing every old associated game of the zone
         */
        const remove = async () => {
            const jeuToRemove : Jeu[] = getJeuToDel();
            for await (let jeu of jeuToRemove) {
                try {
                    await axios.patch(process.env.REACT_APP_API_URL + "zones/removeJeuFrom/" + selectedZone!._id,
                        {
                            id: jeu._id
                        }
                    )
                }catch (err){
                    setConfirmationText(err as string)
                }
            }
        }

    return (
        <StyledForm>
            <div className="reminder">Affecter des jeux à la zone {selectedZone?.nom}</div>
            <Select
                id="selectJeux"
                options={jeuxOptions}
                isMulti
                value={selectedJeu}
                onChange={(values )=>setSelectedJeu(values as Options[] | null)}
                placeholder="Sélectionner des jeux"
            />
            <div id="buttons">
                <Button
                   variant="contained"
                    size="small"
                   onClick={(e)=>onSubmit(e)}
                >
                    Sauvegarder
                </Button>
                <Button onClick={()=>setSelectedZone(undefined)}>Annuler</Button>
                <p>{confirmationText}</p>
            </div>
        </StyledForm>
    )
}

export default ZoneFormJeu