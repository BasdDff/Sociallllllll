import React from 'react'
import styles from "./Registration.module.scss"
import {useDispatch} from "react-redux";
import {Formik, Field, Form} from "formik";
import {validateEmail, validatePassword, validateUsername} from "../../utils/validations/validateEmail";
import {registrationThunkCreator} from "../../redux/actions/login";

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
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {({errors, touched}) => (
                        <Form className={styles.login__loginForm}>
                            <Field name="email" placeholder="email"
                                   className={styles.login__input} validate={validateEmail}/>
                            {errors.email && touched.email && <div className={styles.login__input_error}>{errors.email}</div>}
                            <Field name="password" placeholder="password" type="password"
                                   className={styles.login__input} validate={validatePassword}/>
                            {errors.password && touched.password && <div className={`${styles.login__input_error} ${styles.login__password_error}`}>{errors.password}</div>}
                            <Field name="username" placeholder="username"
                                   className={styles.login__input} validate={validateUsername}/>
                            {errors.username && touched.username && <div className={`${styles.login__input_error} ${styles.login__username_error}`}>{errors.username}</div>}
                            <button className={styles.login__buttonCreateAccount}>
                                Reg
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Registration