import React, { useEffect, useState } from 'react';
import Select, {SingleValue} from 'react-select'
import Jeu from '../../interfaces/jeu';
import Zone from '../../interfaces/zone';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from '@mui/material';
import MultiValue from 'react-select/lib/components/MultiValue';


const StyledJeuFormZone = styled.div`
    

`


interface Option {
    value: Zone,
    label: String
}

interface Props {
    jeu : Jeu,

}

const JeuFormZone : React.FC<Props> = ({jeu}) => {


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
                console.log(jeu)
                console.log(zone)
                if (zone.jeux.includes(jeu)){
                    console.log("yessss")
                    zonesJeu.push(zone)
                    zonesOptionSelected!.push({
                        value: zone,
                        label: zone.name
                    })
                }
            }
            setSelectedZones(zonesOptionSelected)
            setZones(zonesOption)
            setJeuZones(zonesJeu)
            setIsMount(true)
        })
    }, [])

    const getZoneToAdd = () => {
        let addList : Zone[] = []
        for (let zoneSelect of selectedZones!){
            let check : boolean = true
            for (let zoneJeu of jeuZones){
                if (zoneSelect.value._id == zoneJeu._id){
                    check = false
                }
            }
            if (check){
                addList.push(zoneSelect.value)
            }
        }
        return addList
    }

    const getZoneToDel = () => {
        let delList : Zone[] = []
        for (let zoneJeu of jeuZones!){
            let check : boolean = true
            for (let zoneSelect of selectedZones!){
                if (zoneSelect.value._id == zoneJeu._id){
                    check = false
                }
            }
            if (check){
                delList.push(zoneJeu)
            }
        }
        return delList
    }

    const onSubmit = (e : any) => {
        e.preventDefault()
        for (let zone of getZoneToAdd()){
            axios.patch(process.env.REACT_APP_API_URL + "zones/addJeuTo/" + zone._id,
            {
                jeu: jeu
            }
            )
            .then((resp) => {
                if (resp.status == 200){
                    setConfirmationText("Le jeu a bien été ajouté !")
                }
                else {
                    setConfirmationText("Il y a eu un problème lors de l'ajout du jeu")
                }
            })
        }
        for (let zone of getZoneToDel()){
            axios.patch(process.env.REACT_APP_API_URL + "zones/removeJeuFrom/" + zone._id,
            {
                jeu: jeu
            }
            )
            .then((resp) => {
                if (resp.status == 200){
                    setConfirmationText("Le jeu a bien été ajouté !")
                }
                else {
                    setConfirmationText("Il y a eu un problème lors de l'ajout du jeu")
                }
            })
        }

    }


    return (
        <StyledJeuFormZone>
            {isMount && 
                <>
                    <p>Ajouter le jeu {jeu.nom}</p>
                    <form>
                        <Select
                            placeholder={"Choisissez les zones"}
                            options={zones}
                            isMulti
                            required
                            value={selectedZones}
                            onChange={(values) => {setSelectedZones(values as Option[] | null)}}
                        />
                        <Button onClick={(e) => onSubmit(e)}>Ajouter</Button>
                        <p>{confirmationText}</p>
                    </form>
                </>
            }
        </StyledJeuFormZone>
    );
};

export default JeuFormZone;