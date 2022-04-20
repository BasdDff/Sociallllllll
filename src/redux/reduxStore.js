import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware from "redux-thunk"

import userReducer from "./reducers/userReducer"
import loginReducer from "./reducers/loginReducer"
import communityReducer from "./reducers/communityReducer";
import postReducer from "./reducers/postReducer";

let reducers = combineReducers({
    user: userReducer,
    post: postReducer,
    loginPage: loginReducer,
    communityPage: communityReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store