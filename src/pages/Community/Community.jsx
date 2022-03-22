import React from 'react'
import styles from './Community.module.scss'
import {NavLink} from "react-router-dom";
import AvatarCommunityDefault from "../../components/UI/DefaultImages/AvatarCommunityDefault/AvatarCommunityDefault";

const Community = (props) => {
    return (
        <div className={styles.community}>
            <div className={styles.community__block}>
                <AvatarCommunityDefault image={props.imageTitle} classN={styles.community__img}/>
                <div className={styles.community__body}>
                    <NavLink to={`community/${props.id}`} className={styles.community__title}>
                        {props.title}
                    </NavLink>
                    <div className={styles.community__text}>
                        {props.description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Community