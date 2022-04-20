import React, {useEffect} from 'react'
import styles from './NewsFeed.module.scss'
import BaseWrapper from "../../components/UI/BaseWrapper/BaseWrapper";
import {useDispatch, useSelector} from "react-redux";
import PostsLine from "../../components/PostsLine/PostsLine";
import {getTimelinePosts} from "../../redux/actions/post";
import {getUserProfileThunkCreator} from "../../redux/actions/user";

const NewsFeed = () => {

    const dispatch = useDispatch()

    const posts = useSelector(state => state.post.posts)

    useEffect(() => {
        dispatch(getTimelinePosts())
        dispatch(getUserProfileThunkCreator())
    }, [])

    return (
        <BaseWrapper>
            <div className={styles.newsFeed__wrapper}>
                <PostsLine posts={posts}/>
            </div>
        </BaseWrapper>
    )
}

export default NewsFeed