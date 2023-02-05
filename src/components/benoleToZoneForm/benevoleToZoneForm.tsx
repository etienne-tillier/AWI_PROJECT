import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import { NumericStepper } from '@anatoliygatt/numeric-stepper';
import Select from 'react-select'

import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components';
import axios from "axios";
import Benevole from "../../interfaces/benevole";
import Zone from "../../interfaces/zone"

const StyledForm = styled.div`
    
`
interface Option {
    value: String;
    label: String;
}

interface Props{
    benevole : Benevole
    zones : Zone[]
    setBenevoleToLink: (benevole : Benevole | undefined) =>void;
}

const BenevoleToZoneForm : React.FC<Props> = ({benevole, zones, setBenevoleToLink}) => {

    const [confirmationText, setConfirmationText] = useState("")
    const [isSelectedDate, setSelected] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [beginningHour, setBeginningHour] = useState(12)
    const [endingHour, setEndingHour] = useState(13)
    const [zone, setZone] = useState<Option | null>(null);

    let zoneOptions : Option[] = []
    zones.forEach(zone=>{
        zoneOptions.push({
            value: zone._id,
            label: zone.nom
        })
    })

    const onSubmit = (e:any) => {
        e.preventDefault()
        if(zone!==null){
            const dateAndHour1 = selectedDate.setHours(beginningHour, 0, 0, 0)
            const dateAndHour2 = selectedDate.setHours(endingHour, 0, 0, 0)
            axios.patch(process.env.REACT_APP_API_URL + "zones//addBenevoleTo/" + zone!.value, {
                heureDebut: new Date(dateAndHour1).toJSON(),
                heureFin: new Date(dateAndHour2).toJSON(),
                benevole: benevole._id
            }).then((resp) => {
                if (resp.status == 200) {
                    setConfirmationText("Le bénévole a bien été ajouté au créneau saisi sur la zone sélectionnée !")
                    setBenevoleToLink(undefined);
                } else {
                    setConfirmationText("Erreur : " + resp.data.message);
                }
            })
        } else{
            setConfirmationText("Veuillez saisir un zone");
        }
    }

    return (
        <StyledForm>
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
                        <p>{confirmationText}</p>
                    </div>
                }
            </form>
        </StyledForm>
    )
}

export default BenevoleToZoneForm;



