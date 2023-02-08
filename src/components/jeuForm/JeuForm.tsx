import React, {  useRef,useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios"
import Select, {SingleValue} from 'react-select'
import typeJeu from '../../interfaces/typeJeu';
import Jeu from '../../interfaces/jeu';
import {Button, TextField} from "@mui/material";
import TypeJeu from "../../interfaces/typeJeu";


const StyledJeuForm = styled.div`

    margin-top: 2%;
    margin-bottom: 1%;
    
    #jeuForm{
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1%;
      margin-bottom: 5px;
    }
  
    #selectType{
      width: 250px;
    }



`


interface Option {
    value: String;
    label: String;
  }

interface Props {
    onAddToArray: (newArrayValue: Jeu) => void;
    toModif: Jeu|undefined;
    setJeuToModif: (jeu: Jeu|undefined)=>void;
}

const JeuForm : React.FC<Props> = ({onAddToArray, toModif, setJeuToModif}) => {

    const [isMount, setIsMount] = useState(false)
    const [typesJeu, setTypesJeu] = useState([])
    const [typeChoisi, setTypeChoisi] =  useState<Option | null>(null);
    const [confirmationText, setConfirmationText] = useState("")
    const [optionSelectTypeJeu, setOptionSelectTypeJeu] = useState([{}])
    const [nomJeu, setNomJeu] = useState<String>("")
    const [typeJeu, setTypeJeu] = useState<TypeJeu|undefined>(undefined)
    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(()=>{
        if(toModif){
            setNomJeu(toModif.nom);
            setTypeJeu(toModif.type)
        }else{
            setNomJeu("");
            setTypeJeu(undefined);
        }
        setIsMount(true)
    }, [toModif])

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "typeJeux").then((resp) => {
            setTypesJeu(resp.data)
            let options : Option[] = []
            for (let type of resp.data){
                options.push({
                    value: type._id,
                    label: type.nom
                })
            }
            setOptionSelectTypeJeu(options)
            setIsMount(true)
        })
      }, [])

    const onSubmit = (e : any) => {
        e.preventDefault()
        if (inputRef && inputRef.current) {
            const nameValue : String = inputRef.current.value;
            axios.post(process.env.REACT_APP_API_URL + "jeux", {
                nom: nameValue,
                type: {
                    _id : typeChoisi?.value,
                    nom : typeChoisi?.label
                }
            }).then((resp) => {
                if (resp.status === 200){
                    onAddToArray(resp.data)
                    setConfirmationText("Le jeu a bien été crée")
                }
                else {
                    setConfirmationText("Il y a eu une erreur lors de la création du jeu")
                }
            })
        }
    }

    const handleChange = (newValue: SingleValue<{}>) => {
        setTypeChoisi(newValue as Option | null);
    };


    return (
        <StyledJeuForm>
            <form onSubmit={onSubmit} id="jeuForm">
                <TextField
                    id="inputNameJeu"
                    label="Nom"
                    value={nomJeu}
                    required
                    size="small"
                    variant="outlined"
                    inputRef={inputRef}
                    type="text"
                />
                <Select id="selectType"
                        placeholder="Selectionner un type"
                        required
                        //value={optionSelectTypeJeu[optionSelectTypeJeu.indexOf({value: toModif?.type._id})]} TODO
                        options={optionSelectTypeJeu}
                        onChange={handleChange}
                />
                <Button
                    variant="contained"
                    size="small"
                    type="submit"
                >{toModif === undefined ? "Créer" : "Modifier"}
                </Button>
                { toModif !== undefined &&
                    <Button
                        onClick={() => {setJeuToModif(undefined)}}>
                        Annuler
                    </Button>
                }
            </form>
            <p>{confirmationText}</p>
        </StyledJeuForm>
    );
};

export default JeuForm;