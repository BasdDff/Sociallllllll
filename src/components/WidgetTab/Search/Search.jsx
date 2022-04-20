import React, {useEffect, useRef, useState} from 'react'
import styles from './Search.module.scss'
import {BackgroundSecondary} from "../../UI/ThemeTags/Components";
import UserService from "../../../services/UserService";
import ProfileAvatarDefault from "../../UI/DefaultImages/AvatarUserDefault/AvatarUserDefault";
import {NavLink} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from "../../../hooks/useDebounce";

const Search = () => {

    const ref = useRef();

    const [text, setText] = useState("")

    const [users, setUsers] = useState([])

    const [activeSearch, setActiveSearch] = useState(false)

    const activeSearchClick = () => {
        setActiveSearch(true)
    }

    useOnClickOutside(ref, () => setActiveSearch(false));

    const searchUsers = async () => {
        await UserService.searchUsers(text)
            .then(response => {
                setUsers(response.data)
            })
    }

    const debouncedSearch = useDebounce(searchUsers, 500)

    const search = (event) => {
        setText(event.target.value)
    }

    useEffect(() => {
        if (text) {
            debouncedSearch(text)
        }
    }, [text])

    return (
        <div className={activeSearch ? `${styles.search} ${styles.active}` : styles.search}>
            <BackgroundSecondary className={activeSearch ? `${styles.search__container} ${styles.active}` : styles.search__container}>
                <SearchIcon className={styles.search__icon}/>
                <BackgroundSecondary tag="input" className={styles.search__input} placeholder="Search" onChange={search}
                       onFocus={activeSearchClick}
                />
            </BackgroundSecondary>
            {activeSearch && <div className={styles.result__wrapper} ref={ref}>
                {users.length ? users.map((user, index) => (
                        <div className={styles.result__block} key={user._id}>
                            <NavLink to={`/profile/${user._id}`} className={styles.result__link}>
                                <ProfileAvatarDefault avatar={user.profilePicture} classN={styles.result__img}/>
                                <div>
                                    {user.username}
                                </div>
                            </NavLink>
                        </div>
                    ))
                    : <div className={styles.result__textTemplate}>
                        Try looking people
                    </div>}
            </div>}
        </div>
    )
}

function useOnClickOutside(ref, handler) {
    //https://medium.com/@kevinfelisilda/click-outside-element-event-using-react-hooks-2c540814b661
    //https://usehooks.com/useOnClickOutside/
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
}

export default Search