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
      max-height: 53vh;
      overflow-x: hidden;
      overflow-y: auto;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    #concreteList::-webkit-scrollbar {
      display: none;
    }
  
    #filterSelect{
      width: 300px;
    }
  
    #selection{
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1%;
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
            let listeJeu : Jeu[] = []
            axios.get(process.env.REACT_APP_API_URL + "jeux").then((resp) => {
                for (let jeu of resp.data){
                    listeJeu.push(jeu)
                }
                setJeuList(sortByName(listeJeu))
                setIsMount(true)
            })
    }, [])

    useEffect(() => { 
        if (filter.value === "nom" && isMount){
            setJeuList(sortByName(jeuList))
        }
     }, [filter])

    useEffect(()=>{
        if(jeuToAdd===undefined){
            getZones()
        }
    }, [jeuToAdd])

    useEffect(()=>{
        if (isMount){
            getZones()
        }
    }, [jeuList])

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

    const sortByName = (liste : Jeu[]) => {
        let listeJeu : Jeu[] = []
        listeJeu = listeJeu.concat(liste)
        listeJeu = listeJeu.sort((a : Jeu, b : Jeu) => {
            if (a.nom.toUpperCase() < b.nom.toUpperCase()) return -1;
            if (a.nom.toUpperCase() > b.nom.toUpperCase()) return 1;
            return 0;
        })
        return listeJeu
    }

    const updateJeu = (jeux: Jeu[], updatedJeu: Jeu) => {
        const newJeu = [...jeux];
        const index = newJeu.findIndex(jeu => jeu._id === updatedJeu._id);
        if (index !== -1) {
            newJeu[index] = updatedJeu;
        }
        return newJeu;
    };

    const handleAddToArray = (newJeu: Jeu) => {
        setJeuList([...jeuList, newJeu]);
    };

    const handleDelToArray = (jeuToRemove : Jeu) => {
        setJeuList(jeuList.filter(jeu => jeu._id !== jeuToRemove._id));
    }

    const handleUpdateJeu= (updatedJeu: Jeu) => {
        setJeuList(prevJeu => updateJeu(prevJeu, updatedJeu));
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
                    <JeuForm onAddToArray={handleAddToArray} toModif={jeuToModif} setJeuToModif={setJeuToModif} onDelToArray={handleDelToArray} onUpdateArray={handleUpdateJeu}></JeuForm>
                    <div id="selection">
                        <p>Trier par : </p>
                        <Select
                            id="filterSelect"
                            placeholder="Filtrer par..."
                            options={possibleFilters}
                            onChange={(selected)=>setFilter(selected as Filter)}
                        />
                    </div>

                    {filter.value==="nom" ?
                        displayList()
                        :
                        filter.value==="type" ?
                            <ListBy filterType={types} filterZone={null} jeux={jeuList} selectedJeu={jeuToModif} setJeuToModif={setJeuToModif} setJeuToAdd={setJeuToAdd} setZones={getZones}/>
                            :
                            <ListBy filterType={null} filterZone={zones} jeux={jeuList} selectedJeu={jeuToModif} setJeuToModif={setJeuToModif} setJeuToAdd={setJeuToAdd} setZones={getZones}/>
                    }

                    {jeuToAdd &&
                        <JeuFormZone
                            jeu={jeuToAdd}
                            setJeuToAdd={setJeuToAdd}
                        />
                    }
                </StyledJeuList>
            }
        </>
    );
};

export default JeuList;