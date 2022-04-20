import React from 'react'
import Profile from "../pages/Profile/Profile";
import LoginForm from "../pages/Login/LoginForm";
import CommunityIdContainer from "../pages/Community/CommunityId/CommunityIdContainer";
import Communities from "../pages/Community/Communities";
import NewsFeed from "../pages/NewsFeed/NewsFeed";
import Registration from "../pages/Registration/Registration";

//const FindUsers = React.lazy(() => import('../pages/FindUsers/FindUsers'));

export const privateRoutes = [
    {path: "/", component: Profile, exact: true},
    {path: "/Profile/:userId?", component: Profile, exact: false},
    {path: "/communities", component: Communities, exact: false},
    {path: "/community/:communityId?", component: CommunityIdContainer, exact: false},
    {path: "/newsfeed", component: NewsFeed, exact: false},
    // {path: "/users", component: FindUsers, exact: false},
]

export const publicRoutes = [
    {path: "/login", component: LoginForm, exact: true},
    {path: "/registration", component: Registration, exact: true}
]