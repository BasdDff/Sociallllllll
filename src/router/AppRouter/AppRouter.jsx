import React, {Suspense} from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import Error from "../../pages/Error/Error";
import {useSelector} from "react-redux";
import {privateRoutes, publicRoutes} from "../index";
import Preloader from "../../components/UI/Preloader/Preloader";
import FindUsers from "../../pages/FindUsers/FindUsers";

const AppRouter = () => {
    const isAuth = useSelector(state => state.loginPage.isAuth)
    return (
        isAuth ?
            <Switch>
                {privateRoutes.map(route => (
                    <Route
                        key={route.path}
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                    />
                ))}
                <Route path="/error"> <Error/> </Route>
                <Route exact path="/login">}
                    {isAuth && <Redirect to="/profile"/>}
                </Route>
                <Route exact path="/registration">}
                    {isAuth && <Redirect to="/profile"/>}
                </Route>
                <Suspense fallback={<Preloader/>}>
                    <Route path="/users" render={() => <FindUsers/>}/>
                </Suspense>
                <Redirect to="/error"/>
            </Switch> :
            <Switch>
                {publicRoutes.map(route => (
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                    />
                ))}
                <Redirect to="/login"/>
            </Switch>
    )
}

export default AppRouter