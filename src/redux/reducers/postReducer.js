export const SET_POSTS = "postReducer/SET_POSTS"

export const ADD_POST = "postReducer/ADD_POST"
export const EDIT_POST = "postReducer/EDIT_POST"
export const LIKE_POST = "postReducer/LIKE_POST"
export const DELETE_POST = "postReducer/DELETE_POST"

export const IS_POSTS_LOADING = "postReducer/IS_POSTS_LOADING"

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

export default postReducer