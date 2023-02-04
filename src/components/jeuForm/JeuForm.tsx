import React, {  useRef,useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios"
import Select, {SingleValue} from 'react-select'
import typeJeu from '../../interfaces/typeJeu';
import { ValueType, ActionMeta} from "react-select/lib/types";
import Jeu from '../../interfaces/jeu';


const StyledJeuForm = styled.div`



`


interface Option {
    value: string;
    label: string;
  }

  interface Props {
    onAddToArray: (newArrayValue: Jeu) => void;
  }

const JeuForm : React.FC<Props> = ({onAddToArray}) => {

    const [isMount, setIsMount] = useState(false)
    const [typesJeu, setTypesJeu] = useState([])
    const [typeChoisi, setTypeChoisi] =  useState<Option | null>(null);
    const [confirmationText, setConfirmationText] = useState("")
    const [optionSelectTypeJeu, setOptionSelectTypeJeu] = useState([{}])
    const inputRef = useRef<HTMLInputElement>(null);

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
                    _jd : typeChoisi?.value,
                    nom : typeChoisi?.label
                }
            }).then((resp) => {
                if (resp.status == 200){
                    onAddToArray(resp.data)
                    setConfirmationText("Le jeu a bien été crée")
                }
                else {
                    console.log("pbbb")
                    setConfirmationText("Il y a eu une erreur lors de la création du jeu")
                }
            })
        }

    }

    const handleChange = (newValue: SingleValue<{}>, actionMeta: ActionMeta) => {
        setTypeChoisi(newValue as Option | null);
    };


    return (
        <StyledJeuForm>
            <form onSubmit={onSubmit}>
                <label htmlFor="nomJeu">Nom</label>
                <input ref={inputRef} id="inputNameJeu" name="nomJeu" type="text" required/>
                <Select id="selectType"
                        required
                        options={optionSelectTypeJeu}
                        onChange={handleChange}
                         />
                <button>Créer</button>
                <p>{confirmationText}</p>
            </form>
        </StyledJeuForm>
    );
};

export default JeuForm;