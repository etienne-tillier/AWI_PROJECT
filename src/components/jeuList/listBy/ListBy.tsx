import React, {useEffect, useState} from 'react';
import Jeu from '../../../interfaces/jeu';
import styled from 'styled-components';
import JeuItem from '../../jeuItem/JeuItem';
import TypeJeu from "../../../interfaces/typeJeu";
import Zone from "../../../interfaces/zone";

const StyledJeuList = styled.div`

`

interface Props{

    filterType : TypeJeu[] | null
    filterZone : Zone[] | null
    jeux : Jeu[]
    setJeuToModif: (jeu: Jeu|undefined)=>void;
    setJeuToAdd: (jeu: Jeu|undefined)=>void;
}

const ListBy : React.FC<Props> = ({filterType, filterZone, jeux, setJeuToModif, setJeuToAdd}) => {

    const sortByType = ()=>{
        jeux.sort((a,b)=> {
            if (a.type.nom.toUpperCase() < b.type.nom.toUpperCase()) {
                return -1;
            } else if (a.type.nom.toUpperCase() > b.type.nom.toUpperCase()){
                return 1;
            } else{
                return 0;
            }
        })
    }

    useEffect(()=>{
    }, [])

    const displayFilteredJeu = () => {
        if(filterType!==null){
            sortByType();
            return (
                <div>
                    {
                        jeux.map((jeu: Jeu)=>(
                            <>
                                { (jeux.indexOf(jeu)===0 || jeu.type.nom !== jeux[jeux.indexOf(jeu)-1].type.nom) &&
                                    <div className="typeTitle">{jeu.type.nom}</div>
                                }
                                <JeuItem jeu={jeu} selectedJeu={undefined} setJeuToModif={setJeuToModif} setJeuToAdd={setJeuToAdd}/>
                            </>
                        ))
                    }
                </div>
            )
        }else if (filterZone!==null){
            return (
                <div>
                    {
                        filterZone.map((zone: Zone)=>(
                            <>
                                <div className="zoneTitle">{zone.nom}</div>
                                {
                                    zone.jeux.map((jeu: Jeu)=>(
                                        <JeuItem jeu={jeu} selectedJeu={undefined} setJeuToModif={setJeuToModif} setJeuToAdd={setJeuToAdd}/>
                                    ))
                                }
                            </>
                        ))
                    }
                </div>
            )
        } else{
            return (<div>Empty</div>)
        }
    }

    return (
        <StyledJeuList>
            {displayFilteredJeu()}
        </StyledJeuList>
    )
}

export default ListBy;