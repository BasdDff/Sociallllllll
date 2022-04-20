import React, {useEffect} from "react";
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme, mainTheme} from "./utils/Themes/themes";
import {useDarkMode} from "./utils/Themes/useDarkMode";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "./components/UI/Preloader/Preloader";
import AppRouter from "./router/AppRouter/AppRouter";
import {checkAuthThunkCreator} from "./redux/actions/login";


const App = () => {

    const dispatch = useDispatch()

    const isInitialized = useSelector(state => state.loginPage.isInitialized)

    useEffect(() => {
        dispatch(checkAuthThunkCreator())
    }, [])

    const [theme, mountedComponent] = useDarkMode();

    const themeMode = (theme === "light") ? lightTheme :
        (theme === "main") ? mainTheme :
            darkTheme;
    if (!mountedComponent) return <div/>

    if (!isInitialized) {
        return <Preloader/>
    } else {
        return (
            <ThemeProvider theme={themeMode}>
                <BrowserRouter>
                    <AppRouter/>
                </BrowserRouter>
            </ThemeProvider>
        )
    }
}

export default App