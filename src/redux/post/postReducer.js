import PostService from "../../services/PostService";

const SET_POSTS = "postReducer/SET_POSTS"

const ADD_POST = "postReducer/ADD_POST"
const EDIT_POST = "postReducer/EDIT_POST"
const LIKE_POST = "postReducer/LIKE_POST"
const DELETE_POST = "postReducer/DELETE_POST"

const IS_POSTS_LOADING = "postReducer/IS_POSTS_LOADING"

let initialState = {
    isLoading: false,
    posts: []
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.addedPost]
            }
        case DELETE_POST: {
            const index = state.posts.findIndex(post => post._id === action.idPost)
            state.posts.splice(index, 1)
            return {
                ...state,
                posts: [...state.posts]
            }
        }
        case LIKE_POST: {
            const index = state.posts.findIndex(post => post._id === action.idPost)
            if (!state.posts[index].likes.includes(action.authorizedUserId)) {
                state.posts[index].likes.push(action.authorizedUserId)
            } else {
                const indexUser = state.posts[index].likes.indexOf(action.authorizedUserId)
                if (indexUser !== -1) {
                    state.posts[index].likes.splice(indexUser, 1)
                }
            }
            return {
                ...state,
                posts: [...state.posts]
            }
        }
        case EDIT_POST: {
            const index = state.posts.findIndex(post => post._id === action.editedPost._id)
            state.posts[index] = action.editedPost
            return {
                ...state,
                posts: [...state.posts]
            }
        }
        case IS_POSTS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        default:
            return {
                ...state
            }
    }
}

const setPosts = (posts) => {
    console.log("action-creator")
    return {type: SET_POSTS, posts: posts}
}

export const addPostActionCreator = (addedPost) => {
    return {type: ADD_POST, addedPost: addedPost}
}

export const deletePostActionCreator = (idPost) => {
    return {type: DELETE_POST, idPost: idPost}
}

const likePostAction = (idPost, authorizedUserId) => {
    return {type: LIKE_POST, idPost: idPost, authorizedUserId: authorizedUserId}
}

export const editUserPostActionCreator = (editedPost) => {
    return {type: EDIT_POST, editedPost: editedPost}
}

export const toggleLoading = (isLoading) => {
    return {type: IS_POSTS_LOADING, isLoading: isLoading}
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
                console.log(response)
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

export default postReducer