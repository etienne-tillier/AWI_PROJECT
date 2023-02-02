import React, { useState } from 'react';

import styled from 'styled-components';
import axios from "axios"


const StyledBenevoleForm = styled.div`



`



const BenevoleForm = () => {

    const [confirmationText, setConfirmationText] = useState("")


    const onSubmit = (e : any) => {
        e.preventDefault()
        axios.post("http://localhost:5000/" + "benevoles", {
            nom: document.getElementsByTagName("input")[0].value,
            prenom: document.getElementsByTagName("input")[1].value,
            email: document.getElementsByTagName("input")[2].value
          }).then((resp) => {
            if (resp.status == 200) {
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