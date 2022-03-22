import React from 'react'
import defaultBackground from "../../../../assets/img/defaultBackground.jpg"

const BackgroundUserDefault = ({photo, classN}) => {
    return (
        <img src={photo ? photo : defaultBackground} className={classN} alt="default user background"/>
    )
}

export default BackgroundUserDefault