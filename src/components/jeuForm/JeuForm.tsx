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
    value: TypeJeu;
    label: String;
  }

interface Props {
    onAddToArray: (newArrayValue: Jeu) => void;
    toModif: Jeu|undefined;
    setJeuToModif: (jeu: Jeu|undefined)=>void;
    onDelToArray: (jeuToDel : Jeu) => void;
    onUpdateArray: (updatedJeu : Jeu) => void;
}

const JeuForm : React.FC<Props> = ({onAddToArray, toModif, setJeuToModif, onDelToArray, onUpdateArray}) => {

    const [isMount, setIsMount] = useState(false)
    const [typesJeu, setTypesJeu] = useState([])
    const [typeChoisi, setTypeChoisi] =  useState<Option | null>(null);
    const [confirmationText, setConfirmationText] = useState("")
    const [optionSelectTypeJeu, setOptionSelectTypeJeu] = useState<Option[]>([])
    const [nomJeu, setNomJeu] = useState<String>("")
    const [typeJeu, setTypeJeu] = useState<TypeJeu|undefined>(undefined)


    useEffect(()=>{
        if(toModif){
            setNomJeu(toModif.nom);
            setTypeJeu(toModif.type)
            setTypeChoisi({
                value: toModif.type,
                label: toModif.type.nom
            })
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
            options.sort((a,b)=>{
                if(a.label<b.label){
                    return -1
                } else if(a.label>b.label){
                    return 1
                } else{
                    return 0
                }
            })
            setOptionSelectTypeJeu(options)
            setIsMount(true)
        })
      }, [])

      
    const createJeu = () => {
        const nameValue : String = nomJeu;
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

    const modifyJeu = () => {
        const nameValue : String = nomJeu;
        axios.patch(process.env.REACT_APP_API_URL + "jeux/" + toModif?._id, {
            nom: nameValue,
            type: {
                _id : typeChoisi?.value,
                nom : typeChoisi?.label
            }
        }).then((resp) => {
            if (resp.status === 200){
                //TODO update array
                setConfirmationText("Le jeu a bien été modifié")
            }
            else {
                setConfirmationText("Il y a eu une erreur lors de la modification du jeu")
            }
        })
    }

    const onSubmit = (e : any) => {
        e.preventDefault()
        if (toModif){
            modifyJeu()
        }
        else {
            createJeu()
        }
    }


    const handleChange = (newValue: SingleValue<{}>) => {
        setTypeChoisi(newValue as Option | null);
    };

    const handleDelJeu = () => {
        axios.delete(process.env.REACT_APP_API_URL + "jeux/" + toModif!._id).then((resp) => {
            if(resp.status === 200){
                onDelToArray(toModif!)
                setJeuToModif(undefined);
                setTypeChoisi(null)
                setConfirmationText("Le jeu a bien été supprimé ! ")
            }
        })
    }


    return (
        <StyledJeuForm>
            <form onSubmit={onSubmit} id="jeuForm">
                <TextField
                    id="inputNameJeu"
                    label="Nom"
                    value={nomJeu}
                    onChange={e=>setNomJeu(e.target.value)}
                    required
                    size="small"
                    variant="outlined"
                    type="text"
                />
                <Select id="selectType"
                        placeholder="Selectionner un type"
                        required
                        value={typeChoisi}
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
                        onClick={() => {setJeuToModif(undefined); setTypeChoisi(null)}}>
                        Annuler
                    </Button>
                }
            </form>
                { toModif &&
                    <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => {handleDelJeu()}}
                        >
                        Supprimer le jeu
                    </Button>
                }
            <p>{confirmationText}</p>
        </StyledJeuForm>
    );
};

export default JeuForm;