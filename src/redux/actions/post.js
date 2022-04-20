import PostService from "../../services/PostService";
import {ADD_POST, DELETE_POST, EDIT_POST, IS_POSTS_LOADING, LIKE_POST, SET_POSTS} from "../reducers/postReducer";

const setPosts = (posts) => {
    return {type: SET_POSTS, posts: posts}
}

export const addPostActionCreator = (addedPost) => {
    return {type: ADD_POST, addedPost}
}

export const deletePostActionCreator = (idPost) => {
    return {type: DELETE_POST, idPost}
}

const likePostAction = (idPost, authorizedUserId) => {
    return {type: LIKE_POST, idPost, authorizedUserId}
}

export const editUserPostActionCreator = (editedPost) => {
    return {type: EDIT_POST, editedPost}
}

export const toggleLoading = (isLoading) => {
    return {type: IS_POSTS_LOADING, isLoading}
}

export const getTimelinePosts = () => {
    return async (dispatch) => {
        await PostService.getTimelinePosts()
            .then((response) => {
                dispatch(setPosts(response.data))
            })
    }
}

export const getUserPostsThunkCreator = (userId) => {
    return async (dispatch) => {
        dispatch(toggleLoading(true))
        await PostService.fetchPost(userId)
            .then((response) => {
                dispatch(setPosts(response.data))
                dispatch(toggleLoading(false))
            })
    }
}

export const deletePostThunkCreator = (idPost) => {
    return async (dispatch) => {
        await PostService.deletePost(idPost)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(deletePostActionCreator(idPost))
                }
            })
    }
}

export const likePostThunkCreator = (idPost, authorizedUserId) => {
    return async (dispatch) => {
        await PostService.likePost(idPost)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(likePostAction(idPost, authorizedUserId))
                }
            })
    }
}

export const editUserPostThunkCreator = (idPost, desc, file) => {
    return async (dispatch) => {
        await PostService.editPost(idPost, desc, file)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(getPostThunkCreator(idPost))
                }
            })
    }
}

export const getPostThunkCreator = (idPost) => {
    return async (dispatch) => {
        await PostService.getPost(idPost)
            .then((response) => {
                dispatch(editUserPostActionCreator(response.data))
            })
    }
}