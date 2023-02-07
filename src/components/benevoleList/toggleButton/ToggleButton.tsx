import React, {useEffect, useState} from 'react'
import styled from 'styled-components';

const StyledToggleButton = styled.div`
  label {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #2c3e50;
    transition: 0.3s;
    border-radius: 30px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 3px;
    bottom: 2.6px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.3s;
  }

  input:checked + span:before {
    transform: translateX(19px);
  }
  
  strong {
    position: absolute;
    left: 100%;
    width: max-content;
    line-height: 20px;
    margin-left: 10px;
    cursor: pointer;
  }

`

interface Props{
    toggled: boolean,
    onClick: (toggled : boolean)=>void;
}

const Toggle : React.FC<Props> = ({toggled, onClick }) => {
    const [isToggled, toggle] = useState(toggled)
    const [label, setLabel] = useState("Par zone")

    useEffect(()=>{
        const auxLabel = isToggled ? "Par creneau" : "Par zone"
        setLabel(auxLabel)
    }, [isToggled])

    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    }

    return (
        <StyledToggleButton>
            <label>
                <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
                <span />
                <strong>{label}</strong>
            </label>
        </StyledToggleButton>
    )
}

export default Toggle;