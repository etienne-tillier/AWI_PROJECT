import React, { useState, useEffect } from 'react';
import Jeu from '../../interfaces/jeu';
import axios from "axios"
import styled from 'styled-components';
import JeuItem from '../jeuItem/JeuItem';
import JeuForm from '../jeuForm/JeuForm';


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

const JeuList = () => {


    const [isMount, setIsMount] = useState(false)
    const [jeuList, setJeuList] = useState<Jeu[]>([])
    const [jeuToModif, setJeuToModif]=useState<Jeu | undefined>(undefined)

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "jeux").then((resp) => {
            setJeuList(resp.data)
            setIsMount(true)
        })
    }, [])

    useEffect(()=>{
    }, [jeuToModif])

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
                    {displayList()}
                </StyledJeuList>
            }
        </>
    );
};

export default JeuList;