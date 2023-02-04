import React, { useState } from 'react';

import styled from 'styled-components';
import axios from "axios"
import Benevole from '../../interfaces/benevole';


const StyledBenevoleForm = styled.div`



`

interface Props {
    onAddToArray: (newArrayValue: Benevole) => void;
  }

const BenevoleForm : React.FC<Props> = ({onAddToArray}) => {

    const [confirmationText, setConfirmationText] = useState("")


    const onSubmit = (e : any) => {
        e.preventDefault()
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

    return (
        <StyledBenevoleForm>
            <form onSubmit={onSubmit}>
                <label htmlFor="nom">Nom</label>
                <input id="inputNom" type="text" name="nom" required minLength={3}/>
                <label htmlFor="prenom">Prenom</label>
                <input id="inputPrenom" type="text" name="prenom" required minLength={3}/>
                <label htmlFor="email">Email</label>
                <input id="inputEmail" type="email" name="email" required />
                <p>{confirmationText}</p>
                <button>Créer</button>
            </form>
        </StyledBenevoleForm>
    );
};

export default BenevoleForm;