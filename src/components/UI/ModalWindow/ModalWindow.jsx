import styles from "./ModalWindow.module.scss";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import {useDarkMode} from "../../../utils/Themes/useDarkMode";

const ModalWindow = ({name, active, setActive, classN, children}) => {

    const [theme] = useDarkMode();

    return (
        <>
            <div onClick={() => setActive(true)} className={`${styles.btn} ${classN}`}>
                {name}
            </div>
            <div className={active ? `${styles.modal} ${styles.active}` : `${styles.modal}`}
                 onClick={() => setActive(false)}>
                <div className={active ? `${theme}Background ${styles.modal__content} ${styles.active}` : `${theme}Background ${styles.modal__content}`}
                     onClick={e => e.stopPropagation()}>
                    <CloseIcon onClick={() => setActive(false)} className={styles.close}/>
                    {children}
                </div>
            </div>
        </>
    )
}

export default ModalWindow