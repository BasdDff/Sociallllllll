import React from 'react'
import defaultCommunity from "../../../../assets/img/defaultCommunity.jpg"

const AvatarCommunityDefault = ({image, classN}) => {
    return (
        <img src={image ? image : defaultCommunity} className={classN} alt="default community avatar"/>
    )
}

export default AvatarCommunityDefault