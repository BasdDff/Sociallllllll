import styles from "../MenuBurger/MenuBurger.module.scss";
import React from "react";

const MenuBurger = ({burgerBackgroundColor, backgroundColor, active, setActive, children}) => {
    return (
        <>
            <nav className={`${styles.nav}`} style={{"--burger-background-color-var": burgerBackgroundColor}}>
                <div className={active ? `${styles.menuButton} ${styles._active}` : `${styles.menuButton}`}
                     onClick={() => setActive(!active)} style={{ }}>
                    <span className={`${styles.menuButtonSpan}`}/>
                </div>
            </nav>
            <div className={active ? `${styles.menu} ${styles.active}` : `${styles.menu}`}
                 onClick={() => setActive(false)}>
                <div className={styles.blur}/>
                <div onClick={e => e.stopPropagation()} className={`${styles.content}`}
                     style={{"--background-color-var": backgroundColor}}
                >
                    {children}
                </div>
            </div>
        </>
    )
}

export default MenuBurger