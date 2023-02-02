import React, { useState, useEffect } from 'react';
import Jeu from '../../interfaces/jeu';

import axios from "axios"
import styled from 'styled-components';
import JeuItem from '../jeuItem/JeuItem';

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
    const [jeuList, setJeuList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/" + "jeux").then((resp) => {
            setJeuList(resp.data)
            console.log(resp.data)
            setIsMount(true)
        })
    }, [])

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
                    {displayList()}
                </StyledJeuList>
            }
        </>
    );
};

export default JeuList;