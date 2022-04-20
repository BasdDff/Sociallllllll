import React from 'react'
import {Field} from "formik";
import {useDarkMode} from "../../../utils/Themes/useDarkMode";

export const FormikStyledField = ({classN, name, placeholder}) => {

    const [theme] = useDarkMode();

    return (
        <Field className={`${theme}BackgroundInput ${classN}`} name={name} placeholder={placeholder}/>
    )

}

export const BackgroundSecondary = ({tag = "div", className, children, ...props}) => {

    const [theme] = useDarkMode();

    return (
        React.createElement(tag, {
            className: `${theme}BackgroundSecondary ${className}`,
            ...props
        }, children)
    )
}

export const Background = ({tag = "div", className, children, ...props}) => {

    const [theme] = useDarkMode();

    return (
        React.createElement(tag, {
            className: `${theme}ButtonBackground ${className}`,
            ...props
        }, children)
    )
}


export const SecondaryBackground = ({tag = "div", className, children, ...props}) => {

    const [theme] = useDarkMode();

    return (
        React.createElement(tag, {
            className: `${theme}SecondaryBackgroundButton ${className}`,
            ...props
        }, children)
    )
}

export const BorderBackgroundHover = ({tag = "div", className, children, ...props}) => {

    const [theme] = useDarkMode();

    return (
        React.createElement(tag, {
            className: `${theme}Border ${theme}BackgroundHoverButton ${className}`,
            ...props
        }, children)
    )
}

export const BorderBottom = ({tag = "div", className, children, ...props}) => {

    const [theme] = useDarkMode();

    return (
        React.createElement(tag, {
            className: `${theme}BorderBottom ${className}`,
            ...props
        }, children)
    )
}

export const Border = ({tag = "div", className, children, ...props}) => {

    const [theme] = useDarkMode();

    return (
        React.createElement(tag, {
            className: `${theme}Border ${className}`,
            ...props
        }, children)
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