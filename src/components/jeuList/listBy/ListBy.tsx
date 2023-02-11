import React, {useEffect, useState} from 'react';
import Jeu from '../../../interfaces/jeu';
import styled from 'styled-components';
import JeuItem from '../../jeuItem/JeuItem';
import TypeJeu from "../../../interfaces/typeJeu";
import Zone from "../../../interfaces/zone";
import ZoneFormJeu from "../../zoneFormJeu/ZoneFormJeu";

const StyledJeuList = styled.div`
  .concreteList{
    padding-top: 7px;
    padding-bottom: 5px;
    border-radius: 5px;
    margin-top: 1%;
    background-color: #3655b3;
    color: white;
    max-height: 62vh;
    overflow-x: hidden;
    overflow-y: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .concreteList::-webkit-scrollbar {
    display: none;
  }
  
  .title{
    display: inline-block;
    font-size: 1.5em;
    font-weight: bold;
    background-color: white;
    border-radius: 3px;
    padding: 3px;
  }
  
  .zoneTitle{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:25%;
  }
  
  .zoneTitle, .titleJeu{
    margin-top: 20px;
    margin-left: 2%;
  }
  
  .addJeuButton{
    font-weight: bold;
    font-size: 26px;
    text-align: center;
  }
  .addJeuButton:hover{
    cursor: pointer;
    opacity: 0.8;
  }
`

interface Props{

    filterType : TypeJeu[] | null
    filterZone : Zone[] | null
    jeux : Jeu[]
    selectedJeu : Jeu|undefined
    setJeuToModif: (jeu: Jeu|undefined)=>void;
    setJeuToAdd: (jeu: Jeu|undefined)=>void;
}

const ListBy : React.FC<Props> = ({filterType, filterZone, jeux, selectedJeu, setJeuToModif, setJeuToAdd}) => {

    const [selectedZone, setSelectedZone] = useState<Zone|undefined>(undefined)

    useEffect(() => {
            setJeuToAdd(undefined)
      }, [selectedZone])

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
                <div className="concreteList">
                    {
                        jeux.map((jeu: Jeu)=>(
                            <div className="subList">
                                { (jeux.indexOf(jeu)===0 || jeu.type.nom !== jeux[jeux.indexOf(jeu)-1].type.nom) &&
                                    <div className="title titleJeu">{jeu.type.nom}</div>
                                }
                                <JeuItem jeu={jeu} selectedJeu={selectedJeu} setJeuToModif={setJeuToModif} setJeuToAdd={setJeuToAdd}/>
                            </div>
                        ))
                    }
                </div>
            )
        }else if (filterZone!==null){
            return (
                <div className="concreteList">
                    {
                        filterZone.map((zone: Zone)=>(
                            <div className="subList">
                                <div className="zoneTitle">
                                    <div className="title">{zone.nom}</div>
                                    <div className="addJeuButton" onClick={()=>(setSelectedZone(zone), setJeuToAdd(undefined))}>+</div>
                                </div>
                                {
                                    zone.jeux.map((jeu: Jeu)=>(
                                        <JeuItem jeu={jeu} selectedJeu={selectedJeu} setJeuToModif={setJeuToModif} setJeuToAdd={setJeuToAdd}/>
                                    ))
                                }
                            </div>
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
            {selectedZone &&
                <ZoneFormJeu jeux={jeux} selectedZone={selectedZone} setSelectedZone={setSelectedZone}/>
            }
        </StyledJeuList>
    )
}

export default ListBy;