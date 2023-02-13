import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from "react-select";
import DatePicker from "react-datepicker";

import 'react-datepicker/dist/react-datepicker.css'

const StyledSelector = styled.div`
  
    #creneauSelector{
      text-align: left;
      border: solid 1px lightgray;
      border-radius: 5px;
      width: 500px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      @media screen and (max-width: 600px) {
        width: 98%;
      }
    }

  #creneauSelector>*{
    margin: 1%;
  }
  
  .creneauFilterSelect{
    width: 160px;
  }
  
  #filterDatePicker, .creneauFilterSelect{
    font-size: 1em;
  }

  #filterDatePicker{
    margin-right: 20px;
    padding-top: 3px;
    padding-left: 6%;
    border: solid 1px lightgray;
    border-radius: 4px;
    height: 33px;
    width: 120px;
  }

  #filterDatePicker:focus{
    outline-color: #1794FF;
  }

  .react-datepicker-wrapper{
    width: auto;
  }
  
  #infoMsg{
    color: red;
    font-size: 14px;
    margin-left: 2px;
  }
  
  .cancelButton:hover{
    cursor: pointer;
  }
`

interface Option {
    value: number;
    label: String;
}

interface Props{
    setSelectedCreneau : (creneau : {debut: number, fin: number}) => void;
}

const CreneauSelector : React.FC<Props> = ({setSelectedCreneau}) => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [beginningHour, setBeginningHour] = useState(0);
    const [endingHour, setEndingHour] = useState(23);
    const [hourOptionsBeginning, setHourOptionsBeginning] = useState<Option[]>([]);
    const [hourOptionsEnding, setHourOptionsEnding] = useState<Option[]>([]);
    const [msg, setMsg] = useState<String>("")

    useEffect(() => {
        fillOptions()
        const auxMsg : String = beginningHour>=endingHour ?
            "Veuillez saisir une heure de fin supérieure à l'heure de début du créneau"
            : "";
        setMsg(auxMsg)
    }, [beginningHour, endingHour])

    useEffect(()=>{
        if(beginningHour<endingHour){
            setSelectedCreneau({
                debut: new Date(selectedDate).setHours(beginningHour, 0,0,0),
                fin: new Date(selectedDate).setHours(endingHour,0,0,0)
            })
        }
    }, [selectedDate, beginningHour, endingHour])

    const fillOptions = () => {
        let i=0;
        let auxList1 = hourOptionsBeginning;
        let auxList2 = [];
        while(i<24){
            const opt : Option = {value:i, label:i.toString()+":00"}
            if(auxList1.length<24){
                auxList1.push(opt);
            }
            if(i > beginningHour){
                auxList2.push(opt);
            }
            i++;
        }
        setHourOptionsBeginning(auxList1)
        setHourOptionsEnding(auxList2)
    }

    return (
        <StyledSelector>
            <div id="creneauSelector">
                <DatePicker
                    id="filterDatePicker"
                    selected={selectedDate}
                    onChange={(date : Date)=>(setSelectedDate(date))}
                    dateFormat='dd/MM/yyyy'
                    showYearDropdown
                    scrollableYearDropdown
                />
                <Select
                    className="creneauFilterSelect"
                    onChange={(selected)=>setBeginningHour(selected?.value as number)}
                    options={hourOptionsBeginning}
                    placeholder="Heure début"
                />
                <Select
                    className="creneauFilterSelect"
                    onChange={(selected)=>setEndingHour(selected?.value as number)}
                    options={hourOptionsEnding}
                    placeholder={"Heure fin"}
                />
            </div>
            <p id="infoMsg">{msg}</p>
        </StyledSelector>
    )


}

export default CreneauSelector