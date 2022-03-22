import React, {useEffect, useState} from "react";
import Toggle from "./Toggler";

export const useDarkMode = () => {

    const [theme, setTheme] = useState("light");
    const [mountedComponent, setMountedComponent] = useState(false)

        const setMode = mode => {
        window.localStorage.setItem("theme", mode)
        setTheme(mode)
    };

    const themeTogglerSun = () => {
        setMode("light")
    };
    const themeTogglerMoon = () => {
        setMode("moon")
    };
    const themeTogglerMain = () => {
        setMode("main")
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem("theme");
        localTheme ? setTheme(localTheme) : setMode("light")
        setMountedComponent(true)
    }, [themeTogglerSun]);

    const ToggleThemes = () => {
        return (
            <Toggle theme={theme} toggleThemeSun={themeTogglerSun} toggleThemeMoon={themeTogglerMoon}
                    toggleThemeMain={themeTogglerMain}/>
        )
    }

    return [theme, themeTogglerSun, themeTogglerMoon, themeTogglerMain, mountedComponent, ToggleThemes]
}