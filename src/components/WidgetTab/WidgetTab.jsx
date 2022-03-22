import React from 'react'
import Search from './Search/Search'
import styles from './WidgetTab.module.scss'

const WidgetTab = () => {
    return (
        <div className={styles.widgetTab}>
            <Search/>
        </div>
    )
}

export default WidgetTab