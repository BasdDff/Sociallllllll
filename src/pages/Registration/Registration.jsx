import React from 'react'
import styles from "./Registration.module.scss"
import {useDispatch} from "react-redux";
import {
    registrationThunkCreator
} from "../../redux/login/loginReducer";
import {Formik, Field} from "formik";
import {ButtonBackground, FormikStyledForm} from "../../components/UI/ThemesTags/Components";

const Registration = () => {

    const dispatch = useDispatch()

    const registration = (email, password, username) => {
        dispatch(registrationThunkCreator(email, password, username))
    }

    return (
        <div className={styles.login}>
            <div className={styles.login__wrapper}>
                <div className={styles.login__textWrapper}>
                    <div className={styles.login__title}>
                        Social Network
                    </div>
                    <div className={styles.login__text}>

                    </div>
                </div>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        username: ""
                    }}
                    onSubmit={async (values) => {
                        registration(values.email, values.password, values.username)
                    }}
                    enableReinitialize={true}
                >
                    {({errors, touched}) => (
                        <FormikStyledForm classN={styles.login__loginForm}>
                            <Field name="email" placeholder="email"
                                   className={styles.login__input}/>
                            <Field name="password" placeholder="password" type="password"
                                   className={styles.login__input}/>
                            <Field name="username" placeholder="username"
                                   className={styles.login__input}/>
                            <ButtonBackground classN={styles.login__buttonCreateAccount}>
                                Reg
                            </ButtonBackground>
                        </FormikStyledForm>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Registration