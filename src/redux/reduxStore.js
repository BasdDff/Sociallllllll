import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware from "redux-thunk"

import userReducer from "./user/userReducer"
import loginReducer from "./login/loginReducer"
import communityReducer from "./community/communityReducer";
import postReducer from "./post/postReducer";

let reducers = combineReducers({
    user: userReducer,
    post: postReducer,
    loginPage: loginReducer,
    communityPage: communityReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store