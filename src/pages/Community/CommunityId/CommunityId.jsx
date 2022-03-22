import React, {useEffect, useState} from 'react'
import styles from './CommunityId.module.scss'
import BaseWrapper from "../../../components/UI/BaseWrapper/BaseWrapper";

const CommunityId = (props) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (props.posts) {
            setPosts(props.posts)
        }
    }, [props.posts])

    return (
        <BaseWrapper>
            <div className={styles.community}>
                <div className={styles.community__block}>
                    <div className={styles.community__subBlock}>
                        <img
                            src={props.imageTitle ? props.imageTitle : "https://www.presse-citron.net/app/uploads/2018/11/facebook-photo-3d.jpg"}
                            className={styles.community__img} alt="img"/>
                        <div className={styles.community__title}>
                            {props.title}
                        </div>
                    </div>
                    <div className={styles.community__subscribers}>
                        Подписчики
                    </div>
                </div>
                <div className={styles.community__text}>
                    {props.description}
                </div>
                <div>
                    {posts.map((post) => {
                        return (
                            <div>
                                Post 1
                            </div>
                        )
                    })}
                </div>
            </div>
        </BaseWrapper>
    )
}

export default CommunityId