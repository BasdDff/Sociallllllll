import React from 'react'
import styles from "./LoginForm.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {Formik, Field, Form} from "formik";
import {validateEmail} from "../../utils/validations/validateEmail";
import {loginThunkCreator} from "../../redux/actions/login";

const LoginForm = () => {

    const dispatch = useDispatch()

    const login = (email, password) => {
        dispatch(loginThunkCreator(email, password))
    }

    const error = useSelector(state => state.loginPage.error)

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
                    }}
                    onSubmit={async (values) => {
                        login(values.email, values.password)
                    }}
                    enableReinitialize={true}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {({errors, touched}) => (
                        <Form className={styles.login__loginForm}>
                            <Field name="email" placeholder="email"
                                   className={styles.login__input} validate={validateEmail}/>
                            {errors.email && touched.email ? <div className={styles.login__input_error}>{errors.email}</div>
                                :
                                error && <div className={styles.login__input_error}>{error}</div>
                            }
                            <Field name="password" placeholder="password"
                                   className={styles.login__input}/>
                            <button className={styles.login__buttonLogin}>
                                Log in
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginForm