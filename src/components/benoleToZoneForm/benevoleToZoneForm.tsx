import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker'
import { NumericStepper } from '@anatoliygatt/numeric-stepper';
import Select from 'react-select'

import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components';
import axios from "axios";
import Benevole from "../../interfaces/benevole";
import Zone from "../../interfaces/zone"
import Creneau from '../../interfaces/creneau';


interface StyledProps {
    isErrMsg: boolean;
}

const StyledForm = styled.div<StyledProps>`
  
    #infoText{
      color: ${props=>props.isErrMsg ? "red" : "green"}
    }
`

interface Option {
    value: Zone;
    label: String;
}

interface Props{
    benevole : Benevole
    zones : Zone[]
    setBenevoleToLink: (benevole : Benevole | undefined) =>void;
    addCreneauList: (newCreneau : Creneau) =>void;
}

const BenevoleToZoneForm : React.FC<Props> = ({benevole, zones, setBenevoleToLink, addCreneauList}) => {

    const [confirmationText, setConfirmationText] = useState("")
    const [isSelectedDate, setSelected] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [beginningHour, setBeginningHour] = useState<number>(12)
    const [endingHour, setEndingHour] = useState<number>(beginningHour+1)
    const [zone, setZone] = useState<Option | null>(null);
    const [isErrMsg, setErrMsg] = useState(false);

    let zoneOptions : Option[] = []
    zones.forEach(zone=>{
        zoneOptions.push({
            value: zone,
            label: zone.nom
        })
    })

    const onSubmit = (e:any) => {
        e.preventDefault()
        if(zone!==null){
            const dateAndHour1 = selectedDate.setHours(beginningHour, 0, 0, 0)
            const dateAndHour2 = selectedDate.setHours(endingHour, 0, 0, 0)
            if(beginningHour>=endingHour){
                setConfirmationText("L'heure de fin de créneau doit être supérieur à l'heure de début")
                setErrMsg(true);
            }else {
                axios.patch(process.env.REACT_APP_API_URL + "zones/addBenevoleTo/" + zone!.value._id, {
                    heureDebut: new Date(dateAndHour1).toJSON(),
                    heureFin: new Date(dateAndHour2).toJSON(),
                    benevole: benevole._id
                }).then((resp) => {
                    if (resp.status === 200) {
                        addCreneauList({
                            benevole: benevole,
                            debut: new Date(dateAndHour1),
                            fin: new Date(dateAndHour2),
                            zone: zone.value!
                        })
                        setErrMsg(false)
                        setConfirmationText("Le bénévole a bien été ajouté au créneau saisi sur la zone sélectionnée !")
                        setBenevoleToLink(undefined);
                    } else {
                        setErrMsg(true)
                        setConfirmationText("Erreur : " + resp.data.message);
                    }
                })
            }
        } else{
            setErrMsg(true)
            setConfirmationText("Veuillez saisir un zone");
        }
    }

    return (
        <StyledForm isErrMsg={isErrMsg}>
            <div id="benevRemind">
                <p>Ajout de créneau pour : {benevole.nom} {benevole.prenom}</p>
            </div>
            <form onSubmit={onSubmit}>
                <Select id="zoneSelection"
                        required
                        options={zoneOptions}
                        onChange={(selected)=>(setZone(selected))}
                />
                <label htmlFor="date">Date</label>
                <DatePicker
                    id="datePicker"
                    name="date"
                    selected={selectedDate}
                    onChange={(date : Date)=> (setSelectedDate(date), setSelected(true))}
                    dateFormat='dd/MM/yyyy'
                    minDate={new Date()}
                    showYearDropdown
                    scrollableYearDropdown
                    required
                />
                {isSelectedDate &&
                    <div>
                        <div id="hoursSelection" >
                            <label htmlFor="beginningHour">Heure début</label>
                            <NumericStepper
                                minimumValue={0}
                                maximumValue={22}
                                initialValue={beginningHour}
                                onChange={(value)=>setBeginningHour(value)}
                            />
                            <label htmlFor="beginningHour">Heure fin</label>
                            <NumericStepper
                                minimumValue={beginningHour+1}
                                maximumValue={23}
                                initialValue={beginningHour+1}
                                onChange={(value)=>setEndingHour(value)}
                            />
                        </div>
                        <button>Ajouter au créneau</button>
                        <p id="infoText">{confirmationText}</p>
                    </div>
                }
            </form>
        </StyledForm>
    )
}

export default BenevoleToZoneForm;



