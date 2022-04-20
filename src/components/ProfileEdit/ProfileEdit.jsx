import React, {useEffect, useState} from 'react'
import styles from './ProfileEdit.module.scss'
import {useDispatch, useSelector} from "react-redux"
import {Formik, Form} from "formik"
import {
    BackgroundSecondary,
    BorderBottom,
    FormikStyledField,
    SecondaryBackground, BorderBackgroundHover,
} from "../UI/ThemeTags/Components"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./DatePicker.css"
import SvgSuccessAnimated from "../UI/SvgSuccessAnimated/SvgSuccessAnimated";
import {useInput} from "../../hooks/useInput";
import {
    changeTagThunkCreator,
    changeUserBirthdayThunkCreator,
    editUserInfoProfileThunkCreator
} from "../../redux/actions/user";

const ProfileEdit = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.profile)

    const editUserProfile = (user) => {
        dispatch(editUserInfoProfileThunkCreator(user))
    }

    const [isSelectDate, setIsSelectData] = useState(false)
    const [startDate, setStartDate] = useState(new Date(user.birthday));

    const [isSuccessRequestDate, setIsSuccessRequestDate] = useState(false)

    useEffect(() => {
        if (isSuccessRequestDate) {
            setTimeout(() => {
                setIsSelectData(false)
                setIsSuccessRequestDate(false)
            }, 5000)
        }
    }, [isSuccessRequestDate])

    const changeDate = () => {
        dispatch(changeUserBirthdayThunkCreator(startDate, setIsSuccessRequestDate))
    }

    const tag = useInput(user.tag)

    const changeTag = () => {
        dispatch(changeTagThunkCreator(tag.value))
    }

    return (
        <div className={styles.profileEdit}>
            <BorderBottom className={styles.profileEdit__title}>
                Basic info
            </BorderBottom>
            <Formik
                initialValues={{
                    username: user.username,
                    country: user.country,
                    city: user.city,
                    biography: user.biography,
                    birthday: user.birthday,
                    gender: user.gender
                }}
                onSubmit={async (values) => {
                    const user = {
                        "username": values.username,
                        "country": values.country,
                        "city": values.city,
                        "biography": values.biography
                    }
                    editUserProfile(user)
                }}
                enableReinitialize={true}
            >
                {({errors, touched}) => (
                    <Form>
                        <BorderBottom className={styles.profileEdit__inputs}>
                            <div>
                                <div className={styles.profileEdit__inputFlex}>
                                    <label className={styles.profileEdit__labelInput}> Username </label> <br/>
                                    <FormikStyledField name="username" placeholder="username"
                                                       classN={styles.profileEdit__input}/>
                                </div>
                                <div className={styles.profileEdit__inputFlex}>
                                    <label className={styles.profileEdit__labelInput}> Country </label> <br/>
                                    <FormikStyledField name="country" placeholder="country"
                                                       classN={styles.profileEdit__input}/>
                                </div>
                                <div className={styles.profileEdit__inputFlex}>
                                    <label className={styles.profileEdit__labelInput}> City </label> <br/>
                                    <FormikStyledField name="city" placeholder="city"
                                                       classN={styles.profileEdit__input}/>
                                </div>
                                <div className={styles.profileEdit__inputFlex}>
                                    <label className={styles.profileEdit__labelInput}> Biography </label> <br/>
                                    <FormikStyledField name="biography" placeholder="biography"
                                                       classN={styles.profileEdit__input}/>
                                </div>
                            </div>
                            <SecondaryBackground tag="button" className={styles.profileEdit__sendButton}>
                                Send
                            </SecondaryBackground>
                        </BorderBottom>
                    </Form>
                )}
            </Formik>
            <BorderBottom className={styles.birthday__borderBottom}>
                <BackgroundSecondary className={styles.birthday__wrapper}>
                    <div className={styles.birthday__title}>
                        Date birthday
                    </div>
                    <div className={styles.birthday__container}>
                        <DatePicker selected={startDate} onChange={(date) => {
                            setStartDate(date)
                            setIsSelectData(true)
                        }}
                                    className={styles.birthday__input}/>
                        {isSelectDate &&
                        <button onClick={changeDate} className={styles.birthday__changeText}> Change birthday </button>}
                        {isSuccessRequestDate && <div className={styles.birthday__text}>
                            Success change birthday! <SvgSuccessAnimated className={styles.birthday__icon}/>
                        </div>}
                    </div>
                </BackgroundSecondary>
            </BorderBottom>
            <div className={styles.tag__wrapper}>
                <BackgroundSecondary tag="input" className={styles.tag__input} {...tag}/>
                <BorderBackgroundHover tag="button" onClick={changeTag} className={styles.tag__button}> Change tag </BorderBackgroundHover>
            </div>
        </div>
    )
}

export default ProfileEdit