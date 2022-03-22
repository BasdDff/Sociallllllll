import Profile from "../pages/profile/Profile";
import LoginForm from "../pages/Login/LoginForm";
import CommunityIdContainer from "../pages/Community/CommunityId/CommunityIdContainer";
import Communities from "../pages/Community/Communities";
import NewsFeed from "../pages/NewsFeed/NewsFeed";
import FindUsers from "../pages/FindUsers/FindUsers";
import Registration from "../pages/Registration/Registration";

export const privateRoutes = [
    {path: "/", component: Profile, exact: true},
    {path: "/profile/:userId?", component: Profile, exact: false},
    {path: "/communities", component: Communities, exact: false},
    {path: "/community/:communityId?", component: CommunityIdContainer, exact: false},
    {path: "/newsfeed", component: NewsFeed, exact: false},
    {path: "/users", component: FindUsers, exact: false},
]

export const publicRoutes = [
    {path: "/login", component: LoginForm, exact: true},
    {path: "/registration", component: Registration, exact: true}
]