import React, {useEffect} from 'react'
import NewPost from "../../components/NewPost/NewPost";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfileThunkCreator} from "../../redux/user/userReducer";
import {useParams} from "react-router-dom";
import BaseWrapper from "../../components/UI/BaseWrapper/BaseWrapper";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import {getUserPostsThunkCreator} from "../../redux/post/postReducer";
import Preloader from "../../components/UI/Preloader/Preloader";
import PostsLine from "../../components/PostsLine/PostsLine";

const Profile = () => {

    const dispatch = useDispatch()

    const authorizedUserId = useSelector(state => state.loginPage.authorizedUserId)
    const profile = useSelector(state => state.user.profile)

    const {posts, isLoading} = useSelector(state => state.post)

    let {userId} = useParams();

    useEffect(() => {
        if (userId) {
            dispatch(getUserProfileThunkCreator(userId))
            dispatch(getUserPostsThunkCreator(userId))
        } else {
            dispatch(getUserProfileThunkCreator())
            dispatch(getUserPostsThunkCreator())
        }
    }, [userId])

    return (
        <BaseWrapper>
            <ProfileInfo profile={profile}/>
            <NewPost/>
            {isLoading ?
                <Preloader/> :
                <PostsLine posts={posts}/>
            }
        </BaseWrapper>
    )
}

export default Profile