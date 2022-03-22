import React from 'react'
import styles from './Error.module.scss'
import {NavLink} from "react-router-dom";

const Error = () => {
    return (
        <div className={styles.error}>
            <div className={styles.text}>
                Sorry! The page you’re looking for cannot be found.
            </div>
            <NavLink to="/profile" className={styles.link}> Go to Homepage </NavLink>
        </div>
    )
}

export default Error