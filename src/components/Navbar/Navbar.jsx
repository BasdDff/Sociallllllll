import React, {useState} from 'react'
import styles from './Navbar.module.scss'
import {NavLinkBackgroundSecondary, DivBorder, BackgroundSecondary} from "../UI/ThemeTags/Components";
import MenuBurger from "../UI/MenuBurger/MenuBurger";
import {itemsNavigation} from "../../assets/itemsNavigation";
import {useDarkMode} from "../../utils/Themes/useDarkMode";
import {darkTheme, lightTheme, mainTheme} from "../../utils/Themes/themes";
import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "../../utils/Themes/globalStyles";
import Search from "../WidgetTab/Search/Search";
import {NavLink} from "react-router-dom";

const Navbar = () => {

    const [menuActive, setMenuActive] = useState(false)
    const [theme, themeTogglerSun, themeTogglerMoon, themeTogglerMain, mountedComponent, ToggleThemes] = useDarkMode();

    const themeMode = (theme === "light") ? lightTheme :
        (theme === "main") ? mainTheme :
            darkTheme;
    if (!mountedComponent) return <div/>

    return (
        <ThemeProvider theme={themeMode}>
            <div className={styles.nav}>
                <div className={styles.nav__container}>
                    <MenuBurger
                        burgerBackgroundColor={theme === "light" && "black" || theme === "moon" && "#fff" || theme === "main" && "#bbc5ff"}
                        backgroundColor={theme === "light" && "#FFF" || theme === "moon" && "#2e2e2f" || theme === "main" && "#271881"}
                        active={menuActive} setActive={setMenuActive}>
                        <div className={styles.nav__burgerWrapper}>
                            <Search/>
                            <ul className={styles.menu__list}>
                                {itemsNavigation.map(item =>
                                    <li className={styles.menu__item} key={item.id}>
                                        <BackgroundSecondary tag={NavLink} to={item.link} className={styles.menu__link}
                                                                    activeClassName={`_active`}>
                                            <div className={styles.menu__img}>
                                                {item.icon}
                                            </div>
                                            <div className={styles.menu__text}>
                                                {item.value}
                                            </div>
                                        </BackgroundSecondary>
                                    </li>
                                )}
                            </ul>
                            <GlobalStyles/>
                            <ToggleThemes/>
                        </div>
                    </MenuBurger>
                    <div className={styles.nav__themes}>
                        <GlobalStyles/>
                        <ToggleThemes/>
                    </div>
                </div>
                <ul className={styles.nav__list}>
                    {itemsNavigation.map(item =>
                        <li key={item.id}>
                            <BackgroundSecondary tag={NavLink} to={item.link} className={styles.nav__link}
                                                        activeClassName={`_active`}>
                                <div className={styles.nav__img}>
                                    {item.icon}
                                </div>
                                <div className={styles.nav__text}>
                                    {item.value}
                                </div>
                            </BackgroundSecondary>
                        </li>
                    )}
                </ul>
            </div>
        </ThemeProvider>
    )
}

export default Navbar