import React from "react"
import styled from "styled-components";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const Button = styled.button`
    background: transparent;
    color: #fff;
    cursor: pointer;
    transform: scale(1.2);
    padding-right: 10px;
}`;

const Toggle = ({theme, toggleThemeSun, toggleThemeMoon, toggleThemeMain}) => {
    return (
        <>
            <Button onClick={toggleThemeSun} className="lightBtn">
                <WbSunnyIcon className="lightIcon"/>
            </Button>
            <Button onClick={toggleThemeMoon} className="moonBtn">
                <Brightness2Icon className="moonIcon"/>
            </Button>
            <Button onClick={toggleThemeMain} className="mainBtn">
                <RadioButtonCheckedIcon className="mainIcon"/>
            </Button>
        </>
    );
};

export default Toggle;