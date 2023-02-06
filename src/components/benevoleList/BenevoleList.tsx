import React, { useState, useEffect } from 'react';
import BenevoleItem from '../benevoleItem/BenevoleItem';
import Benevole from '../../interfaces/benevole';
import Creneau from "../../interfaces/creneau";
import styled from 'styled-components';
import axios from 'axios';
import BenevoleForm from '../benevoleForm/BenevoleForm';
import BenevoleToZoneForm from "../benoleToZoneForm/benevoleToZoneForm";
import Zone from '../../interfaces/zone';
import BenevoleZone from '../../interfaces/benevoleZone';
import Select, {SingleValue} from 'react-select'


const StyledBenevoleList = styled.div`

    width: 100%;

    .list {
        border-radius: 25px;
        height: 40px;
        margin-bottom: 5px;
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        background-color: #4d4dff;
        gap: 7%;
    }
  
    .list > *{
      width: 150px;
      text-align: center;
    }
    .concreteList{
        background-color: #3655b3;
        color: white;
    }
  
    .removeCreneauButton{
      text-decoration: underline;
    }
    .removeCreneauButton{
      cursor: pointer;
    }

`

interface Option {
    value: Zone | null;
    label: String;
}



const BenevoleList = () => {

    const [zones, setZones] = useState<Zone[]|null>(null)
    const [benevoles, setBenevoles] = useState<Benevole[]>([])
    const [isMount, setIsMount] = useState(false)
    const [selectedZone, setSelectedZone] = useState<Option>({value: null, label:"Tous les Bénévoles"})
    const [optionsSelectZones, setOptionsSelectZone] = useState<Option[]>([])
    const [benevoleToModif, setBenevoleToModif] = useState<Benevole | undefined>(undefined)
    const [benevoleToLink, setBenevoleToLink] = useState<Benevole | undefined>(undefined)
    const [creneauToRemove, setCreneauToRemove] = useState<Creneau|undefined>(undefined)

    useEffect(() => {
        //Fetch benevoles from the api
        let options : Option[] = []
        options.push(
            {
                value: null,
                label: "Tous les Bénévoles"
            }
        )
        axios.get(process.env.REACT_APP_API_URL + "benevoles").then((resp) => {
            setBenevoles(resp.data)
            axios.get(process.env.REACT_APP_API_URL + "zones").then((resp) => {
                setZones(resp.data)
                for (let zone of resp.data) {
                    options.push({
                        value: zone,
                        label: zone.nom
                    })
                }
                setOptionsSelectZone(options)
                setIsMount(true)
            })
        })
      }, [])

    const updateBenevole = (benevoles: Benevole[], updatedBenevole: Benevole) => {
        const newBenevoles = [...benevoles];
        const index = newBenevoles.findIndex(benevole => benevole._id === updatedBenevole._id);
        if (index !== -1) {
            newBenevoles[index] = updatedBenevole;
        }
        return newBenevoles;
    };

    const handleAddToArray = (newBenevole: Benevole) => {
        setBenevoles([...benevoles, newBenevole]);
    };

    const handleDelToArray = (benevoleToRemove : Benevole) => {
        setBenevoles(benevoles.filter(benevole => benevole._id !== benevoleToRemove._id));
    }

    const handleUpdateBenevole = (updatedBenevole: Benevole) => {
        setBenevoles(prevBenevoles => updateBenevole(prevBenevoles, updatedBenevole));
      };

    const handleChange = (newValue: SingleValue<{}>) => {
        setSelectedZone(newValue as Option);
        console.log(selectedZone)
    };

    const removeCreneau = ()=>{
        axios.patch(process.env.REACT_APP_API_URL + "zones/removeBenevFrom/"+creneauToRemove!.zone._id,{
            id: creneauToRemove!.benevole._id,
            heureDebut: creneauToRemove!.debut
        }).then(()=>{
            removeCreneauList(creneauToRemove!)
            setCreneauToRemove(undefined);
        })
    }

    const removeCreneauList = (creneauToDel : Creneau) => {
        let currentZone = selectedZone;
        console.log(new Date(currentZone.value!.benevoles[0].heureDebut).getTime().toString())
        console.log(new Date(creneauToDel.debut).getTime().toString())
        currentZone.value!.benevoles.filter((benevoleZone) => benevoleZone.benevole._id !== creneauToDel.benevole._id &&
                                                            new Date(benevoleZone.heureDebut).getTime().toString() !== new Date(creneauToDel.debut).getTime().toString())
        console.log(currentZone)
        setSelectedZone(currentZone)
    }

    
    const displayList = (zone : Option) => {
        return (
            <>
                <div className="list">
                    <div>Nom</div>
                    <div>Prénom</div>
                    <div>Email</div>
                    {
                        zone.value!=null &&
                        <div>Zone</div>
                    }
                    {
                        zone.value!=null &&
                        <div>Créneau</div>
                    }
                </div>
                <div className="concreteList">
                {
                    zone.value != null ? 
                    zone.value.benevoles.map((benevole : BenevoleZone) => (
                        <BenevoleItem
                            benevole={benevole.benevole}
                            zone={zone.value!}
                            heureDebut={new Date(benevole.heureDebut)}
                            heureFin={new Date(benevole.heureFin)}
                            setBenevoleToModif={setBenevoleToModif}
                            setBenevoleToLink={setBenevoleToLink}
                            setCreneauToRemove={setCreneauToRemove}
                            creneau={creneauToRemove}
                        />
                    ))
                    :
                    benevoles.map((benevole : Benevole) => (
                            <BenevoleItem
                                benevole={benevole}
                                zone={undefined}
                                heureDebut={undefined}
                                heureFin={undefined}
                                setBenevoleToModif={setBenevoleToModif}
                                setBenevoleToLink={setBenevoleToLink}
                                setCreneauToRemove={setCreneauToRemove}
                                creneau={undefined}
                            />
                    ))
                }
                </div>
            </>
        )
    }


    return (
        <>
            {isMount &&
                <StyledBenevoleList>
                    <>
                        <BenevoleForm onAddToArray={handleAddToArray} benevole={benevoleToModif}
                            setBenevoleToModif={setBenevoleToModif} onUpdateToArray={handleUpdateBenevole}
                            onDelToArray={handleDelToArray}/>
                        <div className="select">
                            <Select
                                onChange={handleChange}
                                options={optionsSelectZones}
                            />
                        </div>
                        {displayList(selectedZone)}
                    </>
                    {
                        benevoleToLink!==undefined &&
                        <BenevoleToZoneForm benevole={benevoleToLink} zones={zones!} setBenevoleToLink={setBenevoleToLink}/>
                    }
                    {
                        creneauToRemove!==undefined &&
                        <div className="removeCreneauButton" onClick={removeCreneau}>Supprimer le créneau</div>
                    }
                </StyledBenevoleList>
            }
        </>
    );
};

export default BenevoleList;