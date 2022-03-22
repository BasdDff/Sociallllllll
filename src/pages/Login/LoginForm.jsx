import React from 'react'
import styles from "./LoginForm.module.scss"
import {useDispatch} from "react-redux";
import {loginThunkCreator} from "../../redux/login/loginReducer";
import {Formik, Field} from "formik";
import {ButtonBackground, FormikStyledForm} from "../../components/UI/ThemesTags/Components";

const LoginForm = () => {

    const dispatch = useDispatch()

    const login = (email, password) => {
        dispatch(loginThunkCreator(email, password))
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
                    }}
                    onSubmit={async (values) => {
                        login(values.email, values.password)
                    }}
                    enableReinitialize={true}
                >
                    {({errors, touched}) => (
                        <FormikStyledForm classN={styles.login__loginForm}>
                            <Field name="email" placeholder="email"
                                   className={styles.login__input}/>
                            <Field name="password" placeholder="password"
                                   className={styles.login__input}/>
                            <ButtonBackground classN={styles.login__buttonCreateAccount}>
                                Log in
                            </ButtonBackground>
                        </FormikStyledForm>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginForm