import React, { useState, useEffect } from 'react';
import Jeu from '../../interfaces/jeu';
import axios from "axios"
import styled from 'styled-components';
import JeuItem from '../jeuItem/JeuItem';
import JeuForm from '../jeuForm/JeuForm';

const StyledJeuList = styled.div`

    width: 100%;

    .list {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
    }

`

const JeuList = () => {


    const [isMount, setIsMount] = useState(false)
    const [jeuList, setJeuList] = useState<Jeu[]>([])

    useEffect(() => {
        axios.get("http://localhost:5000/" + "jeux").then((resp) => {
            setJeuList(resp.data)
            setIsMount(true)
        })
    }, [])

    const handleAddToArray = (newJeu: Jeu) => {
        setJeuList([...jeuList, newJeu]);
    };

    const displayList = () => {

        return (
            <>
                <div className="list">
                    <div>Nom</div>
                    <div>Type</div>
                </div>
                {
                    jeuList.map((jeu : Jeu) => (
                        <JeuItem 
                            nom={jeu.nom}
                            type={jeu.type}
                            />
                    ))
                }
            </>
        )

    }


    return (
        <>
            {isMount &&
                <StyledJeuList>
                    <h3>Jeux</h3>
                    <JeuForm onAddToArray={handleAddToArray}></JeuForm>
                    {displayList()}
                </StyledJeuList>
            }
        </>
    );
};

export default JeuList;