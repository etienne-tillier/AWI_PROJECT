import React, { useState, useEffect } from 'react';
import BenevoleItem from '../benevoleItem/BenevoleItem';
import Benevole from '../../interfaces/benevole';
import Creneau from "../../interfaces/creneau";
import styled from 'styled-components';
import axios from 'axios';
import BenevoleForm from '../benevoleForm/BenevoleForm';
import BenevoleZone from '../../interfaces/benevoleZone';
import BenevoleToZoneForm from "../benoleToZoneForm/benevoleToZoneForm";
import Zone from '../../interfaces/zone';
import Select, {SingleValue} from 'react-select'
import Toggle from "./toggleButton/ToggleButton";
import CreneauSelector from "./creneauSelector/CreneauSelector"


const StyledBenevoleList = styled.div`

    width: 100%;
  
    .list > *{
      width: 150px;
      text-align: center;
    }
    .concreteList{
        border-radius: 5px;
        margin-top: 1%;
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
    const [toggled, setToggled]=useState(false);
    const [selectedFilterCreneau, setSelectedFilterCreneau] = useState<{debut : number, fin : number}>({
        debut: new Date().setHours(0,0,0,0),
        fin : new Date().setHours(23,0,0,0),
    })

    useEffect(() => {
        //Fetch benevoles from the api
        axios.get(process.env.REACT_APP_API_URL + "benevoles").then((resp) => {
            setBenevoles(resp.data)
                fetchZones()
                setIsMount(true)
        })
      }, []);

      useEffect(() => {
        if (isMount){
            fetchZones()
        }
        }, [benevoles])

    useEffect(()=>{
        setCreneauToRemove(undefined)
        setBenevoleToLink(undefined)
        setBenevoleToModif(undefined)
        setSelectedZone({value: null, label:"Tous les Bénévoles"})
    }, [toggled])

    const fetchZones = () => {
        let options : Option[] = []
        options.push(
            {
                value: null,
                label: "Tous les Bénévoles"
            }
        )
        axios.get(process.env.REACT_APP_API_URL + "zones").then((resp) => {
            setZones(resp.data)
            for (let zone of resp.data) {
                options.push({
                    value: zone,
                    label: zone.nom
                })
            }
            setOptionsSelectZone(options)
        })
    }

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
        //let currentZone = selectedZone;
        let currentZone = creneauToDel.zone;
        let newZones = zones!.filter((zone) => zone._id !== creneauToDel.zone._id)
        currentZone.benevoles = currentZone.benevoles.filter((benevoleZone) => benevoleZone.benevole._id !== creneauToDel.benevole._id ||
                                                            new Date(benevoleZone.heureDebut).getTime().toString() !== new Date(creneauToDel.debut).getTime().toString())
        
        newZones.push(currentZone)
        newZones = triZone(newZones)
        setZones(newZones)
        //setSelectedZone(currentZone)
    }

    const triZone = (zones: Zone[]) => {
        return zones.sort((a, b) => {
            if (a.nom < b.nom) {
              return -1;
            }
            if (a.nom > b.nom) {
              return 1;
            }
            return 0;
          });
    }

    const addCreneauList = (newCreneau : Creneau) => {
        let currentZone = newCreneau.zone;
        let newZones = zones!.filter((zone) => zone._id !== newCreneau.zone._id)

        currentZone.benevoles.push({
            benevole : newCreneau.benevole,
            heureDebut : newCreneau.debut,
            heureFin : newCreneau.fin
        })
        newZones?.push(currentZone)
        newZones = triZone(newZones)
        setZones(newZones)
        //setSelectedZone(currentZone)
    }

    
    const displayListByZone = (zone : Option) => {
        return (
            <>
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
                            selected={(benevole.benevole._id === benevoleToModif?._id ? true : false)}
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
                                selected={(benevole._id === benevoleToModif?._id ? true : false)}
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
                        <Toggle toggled={toggled} onClick={setToggled}/>
                        { toggled ?
                            <div>
                                <CreneauSelector setSelectedCreneau={setSelectedFilterCreneau}/>
                                <p>Date debut : {new Date(selectedFilterCreneau.debut).toString()}</p>
                                <p>Date fin : {new Date(selectedFilterCreneau.fin).toString()}</p>
                                //TODO : mettre fct qui affiche la liste des creneaux
                            </div>
                            :
                            <div>
                                <div className="select">
                                    <Select
                                        onChange={handleChange}
                                        options={optionsSelectZones}
                                        placeholder="Sélectionner une zone"
                                    />
                                </div>
                                {displayListByZone(selectedZone)}
                            </div>
                        }
                    </>
                    {
                        benevoleToLink!==undefined &&
                        <BenevoleToZoneForm benevole={benevoleToLink} zones={zones!}
                                            setBenevoleToLink={setBenevoleToLink} addCreneauList={addCreneauList}/>
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