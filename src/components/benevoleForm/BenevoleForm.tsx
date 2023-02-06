import React, { useEffect, useState } from 'react';


import styled from 'styled-components';
import axios from "axios"
import Benevole from '../../interfaces/benevole';


const StyledBenevoleForm = styled.div`



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

    const handleClickCreateBenevoleButton = () => {
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
            if (resp.status == 200) {
                onAddToArray(resp.data)
                setConfirmationText("La création du bénévole à bien été faite !")
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
            if (resp.status == 200) {
                onUpdateToArray({
                    _id : benevole!._id,
                    nom : nomBenevole,
                    prenom : prenomBenevole,
                    email : emailBenevole
                })
                resetIndexes()
                setBenevoleToModif(undefined)
                setConfirmationText("La mise à jour du bénévole à bien été faite !")
            }
            else {
                setConfirmationText("Il y a eu un problème lors de la mise à jour du bénévole")
            }
        })
    }

    const handleDelBenevole = () => {

        axios.delete(process.env.REACT_APP_API_URL + "benevoles/" + benevole?._id).then((resp) => {
            if(resp.status == 200){
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

                
                    <form onSubmit={onSubmit}>
                        <label htmlFor="nom">Nom</label>
                        <input id="inputNom" type="text" name="nom" value={nomBenevole} onChange={e => setNomBenevole(e.target.value)} required minLength={3}/>
                        <label htmlFor="prenom">Prenom</label>
                        <input id="inputPrenom" type="text" name="prenom" value={prenomBenevole} onChange={e => setPrenomBenevole(e.target.value)} required minLength={3}/>
                        <label htmlFor="email">Email</label>
                        <input id="inputEmail" type="email" name="email"  value={emailBenevole} onChange={e => setEmailBenevole(e.target.value)} required />
                        <p>{confirmationText}</p>
                        <button>{benevole ? "Modifier" : "Créer"}</button>
                    </form>
                    { benevole &&
                        <>
                            <div className="button" onClick={() => {handleDelBenevole()}}>Supprimer le bénévole</div>
                            <div className="button" onClick={() => {handleClickCreateBenevoleButton()}}>Créer un bénévole</div>
                        </>
                    }
                        
                </StyledBenevoleForm>
            }
    </>
    );
};

export default BenevoleForm;