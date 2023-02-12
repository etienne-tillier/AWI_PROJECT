import React, { useEffect, useState } from 'react';
import Select, {SingleValue} from 'react-select'
import Jeu from '../../interfaces/jeu';
import Zone from '../../interfaces/zone';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from '@mui/material';


const StyledJeuFormZone = styled.div`

    padding: 1%;
    border-radius: 5px;
    width: 600px;
    margin-top: 1%;
    margin-left: 1%;
    border: solid 1px lightgray;
  

    #infoText{
      font-family: "Roboto","Helvetica","Arial",sans-serif;
      font-weight: 500;
      font-size: 1rem;
      margin-left: 3px;
    }
  
    form>*, #infoText{
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
    
    #zoneSelect{
      width: 600px;
    }
  
    #errMsg{
      color: red;
      font-size: 14px;
    }

`
interface Option {
    value: Zone,
    label: String
}

interface Props {
    jeu : Jeu,
    setJeuToAdd : (jeu : Jeu|undefined) => void

}

const JeuFormZone : React.FC<Props> = ({jeu, setJeuToAdd}) => {


    const [zones, setZones] = useState<Option[]>([])
    const [selectedZones, setSelectedZones] = useState<Option[] | null>(null)
    const [confirmationText, setConfirmationText] = useState<string>("")
    const [jeuZones, setJeuZones] = useState<Zone[]>([])
    const [isMount, setIsMount] = useState<boolean>(false)

    useEffect(() => {
        let zonesOption : Option[] = []
        let zonesOptionSelected : Option [] = []
        let zonesJeu : Zone[] = []
        axios.get(process.env.REACT_APP_API_URL + "zones").then((resp) => {
            for (let zone of resp.data){
                zonesOption.push({
                    value: zone,
                    label: zone.nom
                })
                for (let jeuZone of zone.jeux){
                    if (jeuZone._id == jeu._id){
                        zonesJeu.push(zone)
                        zonesOptionSelected!.push({
                            value: zone,
                            label: zone.nom
                        })
                    }
                }
            }
            setSelectedZones(zonesOptionSelected)
            setZones(zonesOption)
            setJeuZones(zonesJeu)
            setIsMount(true)
        })
    }, [jeu])

    /**
     * Get and return every new selected zones to associate with the current Jeu
     */
    const getZoneToAdd = () => {
        let addList : Zone[] = []
        for (let zoneSelect of selectedZones!){
            let check : boolean = true
            for (let zoneJeu of jeuZones){
                if (zoneSelect.value._id === zoneJeu._id){
                    check = false
                }
            }
            if (check){
                addList.push(zoneSelect.value)
            }
        }
        return addList
    }

    /**
     * Get and return every selected zone to unlink from the current Jeu
     */
    const getZoneToDel = () => {
        let delList : Zone[] = []
        for (let zoneJeu of jeuZones!){
            let check : boolean = true
            for (let zoneSelect of selectedZones!){
                if (zoneSelect.value._id === zoneJeu._id){
                    check = false
                }
            }
            if (check){
                delList.push(zoneJeu)
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
        setJeuToAdd(undefined)
    }

    /**
     * Pushing every new associated game in the zone
     */
    const add = async () => {
        const zoneToAdd : Zone[] = getZoneToAdd();
        for await (let zone of zoneToAdd) {
            try {
                await axios.patch(process.env.REACT_APP_API_URL + "zones/addJeuTo/" + zone._id,
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
        const zoneToRemove : Zone[] = getZoneToDel();
        for await (let zone of zoneToRemove) {
            try {
                await axios.patch(process.env.REACT_APP_API_URL + "zones/removeJeuFrom/" + zone._id,
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
        <StyledJeuFormZone>
            {isMount && 
                <>
                    <p id="infoText">Affecter le jeu {jeu.nom}</p>
                    <form>
                        <Select
                            id="zoneSelect"
                            placeholder={"Choisissez les zones"}
                            options={zones}
                            isMulti
                            required
                            value={selectedZones}
                            onChange={(values) => {setSelectedZones(values as Option[] | null)}}
                        />
                        <div id="buttons">
                            <Button onClick={(e) => onSubmit(e)} variant="contained" size="small">Sauvegarder</Button>
                            <Button onClick={()=>setJeuToAdd(undefined)}>Annuler</Button>
                        </div>
                        <p id="errMsg">{confirmationText}</p>
                    </form>
                </>
            }
        </StyledJeuFormZone>
    );
};

export default JeuFormZone;