import React, { useState, useEffect } from 'react';
import BenevoleItem from '../benevoleItem/BenevoleItem';
import Benevole from '../../interfaces/benevole';
import styled from 'styled-components';
import axios from 'axios';
import BenevoleForm from '../benevoleForm/BenevoleForm';
import Zone from '../../interfaces/zone';
import BenevoleZone from '../../interfaces/benevoleZone';
import Select, {SingleValue} from 'react-select'


const StyledBenevoleList = styled.div`

    width: 100%;

    .list {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
    }

`

interface Option {
    value : Zone | null;
    label : String;
}



const BenevoleList = () => {

    const [zones, setZones] = useState(null)
    const [benevoles, setBenevoles] = useState<Benevole[]>([])
    const [isMount, setIsMount] = useState(false)
    const [selectedZone, setSelectedZone] = useState<Option>({value: null, label:"Tous les Bénévoles"})
    const [optionsSelectZones, setOptionsSelectZone] = useState<Option[]>([])

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
                for (let zone of resp.data){
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

    const handleAddToArray = (newBenevole: Benevole) => {
        setBenevoles([...benevoles, newBenevole]);
    };

    const handleChange = (newValue: SingleValue<{}>) => {
        setSelectedZone(newValue as Option);
        console.log(selectedZone)
    };

    
    const displayList = (zone : Option) => {
        return (
            <>
                <div className="list">
                    <div>Nom</div>
                    <div>Prénom</div>
                    <div>Email</div>
                    <div>Zone</div>
                    <div>Créneau</div>
                    <div>Ajouter une zone</div>
                    <div>Modifier</div>
                </div>
                {
                    zone.value != null ? 
                    zone.value.benevoles.map((benevole : BenevoleZone) => (
                            <BenevoleItem
                            benevole={benevole.benevole}
                            nomZone={zone.label}
                            heureDebut={new Date(benevole.heureDebut)}
                            heureFin={new Date(benevole.heureFin)}
                        />
                    ))
                    :
                    benevoles.map((benevole : Benevole) => (
                            <BenevoleItem
                                benevole={benevole}
                                nomZone={undefined}
                                heureDebut={undefined}
                                heureFin={undefined}
                            />
                    ))
                }
            </>
        )
    }


    return (
        <>
            {isMount &&
                <StyledBenevoleList>
                    <>
                        <BenevoleForm onAddToArray={handleAddToArray}/>
                        <div className="select">
                            <Select
                                onChange={handleChange}
                                options={optionsSelectZones}
                            />
                        </div>
                        {displayList(selectedZone)}
                    </>
                </StyledBenevoleList>
            }
        </>
    );
};

export default BenevoleList;