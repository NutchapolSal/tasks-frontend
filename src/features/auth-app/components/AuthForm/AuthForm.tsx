import { FC } from 'react'
import { AuthContextValue, isMyJwtPayload } from '../AuthContext'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { jwtDecode } from 'jwt-decode'
import { isAxiosError } from 'axios'
import client from '../../../../utils/axios'

export interface AuthFormProps {
    handleAuthChange: (authValue: AuthContextValue | null) => void
    authError: string | null
    setAuthError: (error: string | null) => void
    isRegistration: boolean
}

const AuthForm: FC<AuthFormProps> = ({
    handleAuthChange,
    authError,
    setAuthError,
    isRegistration,
}) => {
    return (
        <Formik
            initialValues={{ email: '', password: '', repeatPassword: '' }}
            validationSchema={yup.object({
                email: yup.string().email().required(),
                password: yup.string().required(),
                repeatPassword: isRegistration
                    ? yup.string().required()
                    : yup.string(),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                if (
                    isRegistration &&
                    values.password !== values.repeatPassword
                ) {
                    setAuthError('Passwords do not match')
                    setSubmitting(false)
                    return
                }

                const handler = isRegistration
                    ? client.AuthController_signUp
                    : client.AuthController_signIn

                setAuthError(null)
                try {
                    const response = await handler(null, {
                        email: values.email,
                        rawPassword: values.password,
                    })
                    const jwtPayload = jwtDecode(response.data.accessToken)
                    if (!isMyJwtPayload(jwtPayload)) {
                        throw new Error('Invalid JWT payload')
                    }
                    handleAuthChange({
                        accessToken: response.data.accessToken,
                        jwtPayload,
                    })
                } catch (error) {
                    if (isAxiosError(error) && error.status === 401) {
                        setAuthError(
                            isRegistration
                                ? 'Account already exists'
                                : 'Invalid email or password'
                        )
                        handleAuthChange(null)
                    } else if (error instanceof Error || isAxiosError(error)) {
                        setAuthError(error.message)
                        handleAuthChange(null)
                    } else {
                        throw error
                    }
                }
                setSubmitting(false)
            }}
        >
            {({ isSubmitting }) => (
                <Form className="auth">
                    <label>
                        Email
                        <Field
                            type="email"
                            name="email"
                            disabled={isSubmitting}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <Field
                            type="password"
                            name="password"
                            disabled={isSubmitting}
                            required
                        />
                    </label>
                    {isRegistration ? (
                        <label>
                            Repeat Password
                            <Field
                                type="password"
                                name="repeatPassword"
                                disabled={isSubmitting}
                                required
                            />
                        </label>
                    ) : null}

                    <button type="submit" disabled={isSubmitting}>
                        {isRegistration ? 'Register' : 'Login'}
                    </button>
                    <div className="errors">
                        {authError == null ? null : <div>{authError}</div>}
                        <ErrorMessage name="email" component="div" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default AuthForm
