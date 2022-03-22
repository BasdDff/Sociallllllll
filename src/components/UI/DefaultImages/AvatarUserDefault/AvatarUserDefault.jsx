import React from 'react'
import defaultUser from '../../../../assets/img/defaultUser.png'

const AvatarUserDefault = ({avatar, classN}) => {
    return (
        <img src={avatar ? avatar : defaultUser} className={classN} alt="default user avatar"/>
    )
}

export default AvatarUserDefault