import React, { useEffect, useState } from 'react';


import styled from 'styled-components';
import axios from "axios"
import Benevole from '../../interfaces/benevole';
import {Button, TextField} from "@mui/material";


const StyledBenevoleForm = styled.div`
  
  margin-top: 2%;
  margin-bottom: 1%;
  
  #benevForm{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1%;
    margin-bottom: 5px;
  }


`

interface Props {
    onAddToArray: (newArrayValue: Benevole) => void;
    onUpdateToArray: (newArrayValue: Benevole) => void;
    benevole : Benevole | undefined;
    setBenevoleToModif : (benevole : Benevole | undefined) => void;
    onDelToArray : (benevole : Benevole) => void;
  }

const BenevoleForm : React.FC<Props> = ({onAddToArray, benevole, setBenevoleToModif, onUpdateToArray, onDelToArray}) => {

    const [confirmationText, setConfirmationText] = useState("")
    const [nomBenevole, setNomBenevole] = useState<string>("")
    const [prenomBenevole, setPrenomBenevole] = useState<string>("")
    const [emailBenevole, setEmailBenevole] = useState<string>("")
    const [isMount, setIsMount] = useState(false)



    useEffect(() => {
        if (benevole){
            setNomBenevole(benevole.nom.toString())
            setPrenomBenevole(benevole.prenom.toString())
            setEmailBenevole(benevole.email.toString())
        }
        setIsMount(true)
      }, [benevole])


    const resetIndexes = () => {
        setNomBenevole("")
        setPrenomBenevole("")
        setEmailBenevole("")
    }

    const cancelModification = () => {
        resetIndexes()
        setBenevoleToModif(undefined)
    }

    const onSubmit = (e : any) => {
        e.preventDefault()
        if (benevole){
            onModif()
        }
        else {
            onCreate()
        }
    
    }

    const onCreate = () => {
        axios.post(process.env.REACT_APP_API_URL + "benevoles", {
            nom: document.getElementsByTagName("input")[0].value,
            prenom: document.getElementsByTagName("input")[1].value,
            email: document.getElementsByTagName("input")[2].value
          }).then((resp) => {
            if (resp.status === 200) {
                onAddToArray(resp.data)
                setConfirmationText("Bénévole créé avec succès")
            }
            else {
                setConfirmationText("Il y a eu un problème lors de la création du bénévole")
            }
        })
    }


    const onModif = () => {

        axios.patch(process.env.REACT_APP_API_URL + "benevoles/" + benevole?._id, {
            nom: nomBenevole,
            prenom: prenomBenevole,
            email: emailBenevole
        }).then((resp) => {
            if (resp.status === 200) {
                onUpdateToArray({
                    _id : benevole!._id,
                    nom : nomBenevole,
                    prenom : prenomBenevole,
                    email : emailBenevole
                })
                resetIndexes()
                setBenevoleToModif(undefined)
                setConfirmationText("Bénévole modifié avec succès")
            }
            else {
                setConfirmationText("Il y a eu un problème lors de la mise à jour du bénévole")
            }
        })
    }

    const handleDelBenevole = () => {

        axios.delete(process.env.REACT_APP_API_URL + "benevoles/" + benevole?._id).then((resp) => {
            if(resp.status === 200){
                onDelToArray(benevole!)
                setConfirmationText("Le bénévole a bien été supprimé ! ")
                resetIndexes()
            }
        })

    }

    return (
        <>
            {isMount &&
                <StyledBenevoleForm>

                    <form onSubmit={onSubmit} id="benevForm">
                       <TextField
                            id="inputNom"
                            label="Nom"
                            value={nomBenevole}
                            onChange={e => setNomBenevole(e.target.value)}
                            required
                            size="small"
                            variant="outlined"
                            inputProps={{
                                minLength: 2,
                            }}
                        />
                        <TextField
                            id="inputPrenom"
                            label="Prenom"
                            value={prenomBenevole}
                            onChange={e => setPrenomBenevole(e.target.value)}
                            required
                            size="small"
                            variant="outlined"
                            inputProps={{
                                minLength: 2,
                            }}
                        />
                        <TextField
                            id="inputEmail"
                            label="Email"
                            type="email"
                            value={emailBenevole}
                            onChange={e => setEmailBenevole(e.target.value)}
                            required
                            size="small"
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            size="small"
                            type="submit"
                        >{benevole ? "Modifier" : "Créer"}
                        </Button>
                        { benevole &&
                            <Button
                                onClick={() => {cancelModification()}}>
                                Annuler
                            </Button>
                        }
                    </form>
                    <p>{confirmationText}</p>
                    { benevole &&
                        <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => {handleDelBenevole()}}
                            >
                            Supprimer le bénévole
                        </Button>
                    }
                        
                </StyledBenevoleForm>
            }
    </>
    );
};

export default BenevoleForm;