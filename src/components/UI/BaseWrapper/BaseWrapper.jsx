import React from 'react'
import styles from './BaseWrapper.module.scss'
import Navbar from "../../Navbar/Navbar";
import WidgetTab from "../../WidgetTab/WidgetTab";

const BaseWrapper = ({children}) => {
    return (
        <div className={styles.wrapper_no_width}>
            <div className={styles.wrapper}>
                <div className={styles.navbarWrapper}>
                    <div className={styles.navbar}>
                        <Navbar/>
                    </div>
                </div>
                <div className={styles.route}>
                    {children}
                </div>
                <div className={styles.widgetTabWrapper}>
                    <div className={styles.widgetTab}>
                        <WidgetTab/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BaseWrapper