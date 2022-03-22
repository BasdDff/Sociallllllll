import React from 'react'
import "./svg.css"

const SvgSuccessAnimated = ({className}) => {
    return (
        <svg className={className} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
             x="0px" y="0px"
             viewBox="0 0 70 70" xmlSpace="preserve">
            <circle className="circleSuccess" cx="35" cy="35" r="25"/>
            <polyline className="polylineSuccess" points="48,25 32,43 22,35 "/>
        </svg>
    )
}

export default SvgSuccessAnimated