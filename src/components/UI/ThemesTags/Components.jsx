import React from 'react'
import {Form, Field} from "formik";
import {useDarkMode} from "../../../utils/Themes/useDarkMode";
import {NavLink} from "react-router-dom";

export const FormikStyledForm = ({classN, children}) => {

    const [theme] = useDarkMode();

    return (
        <Form className={`${theme}BackgroundForm ${classN}`}>
            {children}
        </Form>
    )

}

export const FormikStyledField = ({classN, name, placeholder}) => {

    const [theme] = useDarkMode();

    return (
        <Field className={`${theme}BackgroundInput ${classN}`} name={name} placeholder={placeholder}/>
    )

}

export const Input = ({className, ...props}) => {

    const [theme] = useDarkMode();

    return (
        <input className={`${theme}BackgroundSecondary ${className}`} {...props}/>
    )

}

export const ButtonBackground = ({classN, children}) => {

    const [theme] = useDarkMode();

    return (
        <button className={`${theme}ButtonBackground ${classN}`}>
            {children}
        </button>
    )

}

export const ButtonSecondaryBackground = ({classN, children}) => {

    const [theme] = useDarkMode();

    return (
        <button className={`${theme}SecondaryBackgroundButton ${classN}`}>
            {children}
        </button>
    )

}

export const ButtonBorderBackgroundHover = ({className, children, ...props}) => {

    const [theme] = useDarkMode();

    return (
        <button className={`${theme}Border ${theme}BackgroundHoverButton ${className}`} {...props}> {children} </button>
    )
}

export const LabelBorderBackgroundHover = ({tag = "div", classN, children, htmlFor}) => {

    const [theme] = useDarkMode();

    return (
        <label htmlFor={htmlFor} className={`${theme}Border ${theme}BackgroundHoverButton ${classN}`}>
            {children}
        </label>
    )
}

export const DivBorderBackgroundHover = ({tag = "div", onClick, classN, children, htmlFor}) => {

    const [theme] = useDarkMode();

    return (
        React.createElement(tag, {
            className: `${theme}Border ${theme}BackgroundHoverButton ${classN}`,
            onClick: onClick
        }, children)
    )
}

export const DivBorderBottom = ({classN, children}) => {

    const [theme] = useDarkMode()

    return (
        <div className={`${theme}BorderBottom ${classN}`}>
            {children}
        </div>
    )

}

export const DivBorder = ({type = "div", classN, children}) => {

    const [theme] = useDarkMode()

    return (
        React.createElement(type, {className: `${theme}Border ${classN}`}, children)
    )

}


export const DivBackgroundSecondary = ({type = "div", classN, children}) => {

    const [theme] = useDarkMode()

    return (
        React.createElement(type, {className: `${theme}BackgroundSecondary ${classN}`}, children)
    )

}

export const NavLinkBackgroundSecondary = ({classN, to, children}) => {

    const [theme] = useDarkMode()

    return (
        <NavLink className={`${theme}BackgroundSecondary ${classN}`} to={to}>
            {children}
        </NavLink>
    )

}

export const Select = ({options = [], defaultValue, value, onChange, classN}) => {

    const [theme] = useDarkMode()

    return (
        <select value={value} onChange={event => onChange(event.target.value)}
                className={`${theme}BackgroundSecondary ${classN}`}>
            <option disabled value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    )
}