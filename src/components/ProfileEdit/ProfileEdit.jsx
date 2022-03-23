import React, {useEffect, useState} from 'react'
import styles from './ProfileEdit.module.scss'
import {useDispatch, useSelector} from "react-redux"
import {
    changeTagThunkCreator,
    changeUserBirthdayThunkCreator,
    editUserInfoProfileThunkCreator
} from "../../redux/user/userReducer"
import {Formik, Form} from "formik"
import {
    DivBackgroundSecondary,
    DivBorderBottom,
    FormikStyledField,
    ButtonSecondaryBackground, Input, ButtonBorderBackgroundHover
} from "../UI/ThemesTags/Components"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./DatePicker.css"
import SvgSuccessAnimated from "../UI/SvgSuccessAnimated/SvgSuccessAnimated";
import {useInput} from "../../hooks/useInput";

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
            <DivBorderBottom classN={styles.profileEdit__title}>
                Basic info
            </DivBorderBottom>
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
                        <DivBorderBottom classN={styles.profileEdit__inputs}>
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
                            <ButtonSecondaryBackground classN={styles.profileEdit__sendButton}>
                                Send
                            </ButtonSecondaryBackground>
                        </DivBorderBottom>
                    </Form>
                )}
            </Formik>
            <DivBorderBottom classN={styles.birthday__borderBottom}>
                <DivBackgroundSecondary classN={styles.birthday__wrapper}>
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
                </DivBackgroundSecondary>
            </DivBorderBottom>
            <div className={styles.tag__wrapper}>
                <Input className={styles.tag__input} {...tag}/>
                <ButtonBorderBackgroundHover onClick={changeTag} className={styles.tag__button}> Change tag </ButtonBorderBackgroundHover>
            </div>
        </div>
    )
}

export default ProfileEdit