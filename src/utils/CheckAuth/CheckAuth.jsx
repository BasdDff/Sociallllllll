import React from 'react'
import {useSelector} from "react-redux";

const CheckAuth = ({_id, children}) => {

    const authorizedUserId = useSelector(state => state.loginPage.authorizedUserId)

    if (authorizedUserId === _id) {
        return (
            <>
                {children}
            </>
        )
    } else {
        return null
    }
}

export default CheckAuth