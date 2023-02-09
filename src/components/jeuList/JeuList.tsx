import React, { useState, useEffect } from 'react';
import Jeu from '../../interfaces/jeu';
import axios from "axios"
import styled from 'styled-components';
import JeuItem from '../jeuItem/JeuItem';
import JeuForm from '../jeuForm/JeuForm';
import JeuFormZone from '../jeuFormZone/JeuFormZone';
import Select from "react-select";
import ListBy from "./listBy/ListBy";
import TypeJeu from "../../interfaces/typeJeu";
import Zone from "../../interfaces/zone";

const StyledJeuList = styled.div`

    width: 100%;
  
    #concreteList{
      padding-top: 7px;
      padding-bottom: 5px;
      border-radius: 5px;
      margin-top: 1%;
      background-color: #3655b3;
      color: white;
    }
`

interface Filter{
    label: String,
    value: String
}

const JeuList = () => {

    const possibleFilters : Filter[] = [{label: "Nom", value:"nom"}, {label: "Type", value:"type"}, {label: "Zone", value:"zone"}]

    const [types, setTypes] = useState<TypeJeu[]>([])
    const [filter, setFilter] = useState<Filter>(possibleFilters[0])
    const [jeuToAdd, setJeuToAdd] = useState<Jeu | undefined>(undefined)
    const [isMount, setIsMount] = useState(false)
    const [jeuList, setJeuList] = useState<Jeu[]>([])
    const [jeuToModif, setJeuToModif]=useState<Jeu | undefined>(undefined)
    const [zones, setZones] = useState<Zone[]>([]);

    useEffect(() => {
        getZones()
        if(types.length<1) {
            fillTypes()
        }
        axios.get(process.env.REACT_APP_API_URL + "jeux").then((resp) => {
            for (let jeu of resp.data){
                jeuList.push({
                    _id: jeu._id,
                    nom: jeu.nom,
                    type: {
                        _id: jeu.type._id,
                        nom: jeu.type.nom
                    }
                })
            }
            setIsMount(true)
        })
    }, [])

    /**
     * Fetching types
     */
    const fillTypes = ()=>{
        axios.get(process.env.REACT_APP_API_URL + "typeJeux").then((resp) => {
            let aux: TypeJeu[] = []
            for (let type of resp.data) {
                aux.push(type)
            }
            setTypes(aux)
        })
    }

    /**
     * Fetching every zones
     */
    const getZones = () => {
        axios.get(process.env.REACT_APP_API_URL + "zones").then((resp)=>{
            let aux : Zone[] = [];
            setZones([])
            for(let zone of resp.data){
                aux.push(zone)
            }
            setZones(aux)
        })
    }

    const handleAddToArray = (newJeu: Jeu) => {
        setJeuList([...jeuList, newJeu]);
    };

    const displayList = () => {

        return (
            <div id="concreteList">
                {
                    jeuList.map((jeu : Jeu) => (
                        <JeuItem
                            jeu={jeu}
                            selectedJeu={jeuToModif}
                            setJeuToModif={setJeuToModif}
                            setJeuToAdd={setJeuToAdd}
                            />
                    ))
                }
            </div>
        )

    }


    return (
        <>
            {isMount &&
                <StyledJeuList>
                    <JeuForm onAddToArray={handleAddToArray} toModif={jeuToModif} setJeuToModif={setJeuToModif}></JeuForm>
                    <Select
                        placeholder="Filtrer par..."
                        options={possibleFilters}
                        onChange={(selected)=>setFilter(selected as Filter)}
                    />

                    {filter.value==="nom" ?
                        displayList()
                        :
                        filter.value==="type" ?
                            <ListBy filterType={types} filterZone={null} jeux={jeuList} setJeuToModif={setJeuToModif} setJeuToAdd={setJeuToAdd}/>
                            :
                            <ListBy filterType={null} filterZone={zones} jeux={jeuList} setJeuToModif={setJeuToModif} setJeuToAdd={setJeuToAdd}/>
                    }

                    {jeuToAdd &&
                        <JeuFormZone
                            jeu={jeuToAdd}
                        />
                    }
                </StyledJeuList>
            }
        </>
    );
};

export default JeuList;