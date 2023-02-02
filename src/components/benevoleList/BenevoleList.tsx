import React, { useState, useEffect } from 'react';
import BenevoleItem from '../benevoleItem/BenevoleItem';
import Benevole from '../../interfaces/benevole';
import styled from 'styled-components';
import reactSelect from 'react-select';
import axios from 'axios';
import BenevoleForm from '../benevoleForm/BenevoleForm';

const StyledBenevoleList = styled.div`

    width: 100%;

    .list {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
    }

`



const BenevoleList = () => {

    const [zones, setZones] = useState(null)
    const [benevoles, setBenevoles] = useState([])
    const [isMount, setIsMount] = useState(false)
    const [optionsSelectZones, setOptionsSelectZone] = useState([])

    useEffect(() => {
        //Fetch benevoles from the api
        axios.get("http://localhost:5000/" + "benevoles").then((resp) => {
            setBenevoles(resp.data)
            axios.get("http://localhost:5000/" + "zones").then((resp) => {
                setZones(resp.data)
                setIsMount(true)
            })
        })
      }, [])

    
    const displayList = () => {
        return (
            <>
                <div className="list">
                    <div>Nom</div>
                    <div>Prénom</div>
                    <div>Email</div>
                </div>
                {
                    benevoles.map((benevole : Benevole) => (
                            <BenevoleItem 
                                nom={benevole.nom} 
                                prenom={benevole.prenom} 
                                email={benevole.email}
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
                    <h3>Bénévoles</h3>
                    <BenevoleForm/>
                    <div className="select">

                    </div>
                    {displayList()}
                </StyledBenevoleList>
            }
        </>
    );
};

export default BenevoleList;