import React, {useEffect, useState} from 'react'
import styles from './FindUsers.module.scss'
import BaseWrapper from "../../components/UI/BaseWrapper/BaseWrapper";
import {useDispatch, useSelector} from "react-redux";
import {
    follow,
    getScrollUsers,
    setFetchingScroll,
    unfollow
} from "../../redux/user/userReducer";
import ProfileAvatarDefault from "../../components/UI/DefaultImages/AvatarUserDefault/AvatarUserDefault";
import {
    DivBackgroundSecondary,
    Input,
    ButtonBorderBackgroundHover,
    Select
} from "../../components/UI/ThemesTags/Components";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from '@mui/icons-material/Category';
import {useFiltersUsers} from "../../hooks/useFiltersUsers";

const FindUsers = () => {

    const dispatch = useDispatch()

    const {users, pageSize, totalCount, currentPage, fetchingScroll} = useSelector(state => state.user)

    const authorizedUserId = useSelector(state => state.loginPage.authorizedUserId)

    useEffect(() => {
        if (fetchingScroll) {
            dispatch(getScrollUsers(currentPage, pageSize))
        }
    }, [fetchingScroll])

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler)
        return function () {
            document.removeEventListener("scroll", scrollHandler)
        }
    }, [users, totalCount])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && users.length < totalCount) {
            dispatch(setFetchingScroll(true))
        }
        //Общая высота страницы e.target.documentElement.scrollHeight
        //Текущее положение скролла от верхней границы e.target.documentElement.scrollTop
        //Высота видимой области страницы window.innerHeight
    }

    const onFollow = (userId) => {
        dispatch(follow(userId, authorizedUserId))
    }

    const onUnfollow = (userId) => {
        dispatch(unfollow(userId, authorizedUserId))
    }

    const [filter, setFilter] = useState({sort: "", query: ""})

    const search = async (event) => {
        setFilter({...filter, query: event.target.value})
    }

    const sortUsers = (sort) => {
        setFilter({...filter, sort: sort.toString()})
    }

    const filteredUsers = useFiltersUsers(users, filter.sort, filter.query)

    return (
        <BaseWrapper>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    Users
                </div>
                <div className={styles.search__wrapper}>
                    <DivBackgroundSecondary classN={styles.search__container}>
                        <SearchIcon className={styles.search__icon}/>
                        <Input className={styles.search__input} placeholder="Search" onChange={search}
                               value={filter.query}/>
                    </DivBackgroundSecondary>
                    <DivBackgroundSecondary classN={styles.search__container}>
                        <CategoryIcon className={styles.search__icon}/>
                        <Select
                            value={filter.sort}
                            onChange={sortUsers}
                            defaultValue={"Sort"}
                            options={[
                                {value: "username", name: "By username"},
                                {value: "email", name: "By email"}
                            ]}
                            classN={styles.search__select}
                        />
                    </DivBackgroundSecondary>
                </div>
                <div className={styles.container}>
                    {filteredUsers.map((user) => (
                        <div className={styles.item} key={user._id}>
                            <div className={styles.text}>
                                {user.username}
                            </div>
                            <div>
                                <ProfileAvatarDefault avatar={user.profilePicture} classN={styles.avatar}/>
                            </div>
                            <div>
                                {user.followers.includes(authorizedUserId) ?
                                    <ButtonBorderBackgroundHover onClick={() => {
                                        onUnfollow(user._id, authorizedUserId)
                                    }} className={styles.button}>Unfollow</ButtonBorderBackgroundHover> :
                                    <ButtonBorderBackgroundHover onClick={() => {
                                        onFollow(user._id, authorizedUserId)
                                    }} className={styles.button}> Follow
                                    </ButtonBorderBackgroundHover>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </BaseWrapper>
    )
}

export default FindUsers