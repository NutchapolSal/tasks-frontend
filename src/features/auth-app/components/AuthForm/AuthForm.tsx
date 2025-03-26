import { FC, useContext, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import client from '../../../../utils/axios'
import { isAxiosError } from 'axios'
import { AuthContext, AuthContextValue, isMyJwtPayload } from '../AuthContext'
import { jwtDecode } from 'jwt-decode'

export interface AuthFormProps {
    outputHandler: (accessToken: AuthContextValue | null) => void
}

const AuthForm: FC<AuthFormProps> = ({ outputHandler }) => {
    const authValue = useContext(AuthContext)
    const [authError, setAuthError] = useState<string | null>(null)

    const refreshAccessToken = async (
        accessToken: string,
        outputHandler: AuthFormProps['outputHandler']
    ) => {
        try {
            const response = await client.AuthController_getNewAccessToken(
                null,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            const jwtPayload = jwtDecode(response.data.accessToken)
            if (!isMyJwtPayload(jwtPayload)) {
                throw new Error('Invalid JWT payload')
            }
            outputHandler({
                accessToken: response.data.accessToken,
                jwtPayload,
            })
        } catch (error) {
            if (isAxiosError(error) && error.status === 401) {
                setAuthError('Session has expired, Please log in again')
                outputHandler(null)
            } else if (
                error instanceof Error &&
                error.message === 'Invalid JWT payload'
            ) {
                setAuthError('Invalid JWT payload')
                outputHandler(null)
            } else {
                throw error
            }
        }
    }

    // refresh on first render
    useEffect(() => {
        if (authValue == null) {
            return
        }
        refreshAccessToken(authValue.accessToken, outputHandler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // then refresh on almost expiry
    useEffect(() => {
        if (authValue == null || authValue.jwtPayload?.exp == null) {
            return
        }

        const msToExpiry = Math.max(
            0,
            authValue.jwtPayload.exp * 1000 - Date.now()
        )

        if (msToExpiry < 0) {
            setAuthError('Session has expired, Please log in again')
            outputHandler(null)
            return
        }

        const refreshIntervalId = setTimeout(
            () => refreshAccessToken(authValue.accessToken, outputHandler),
            msToExpiry * 0.9
        )

        return () => clearTimeout(refreshIntervalId)
    }, [authValue, outputHandler])

    if (authValue != null) {
        return (
            <>
                <p>Logged in as {authValue.jwtPayload.email ?? ''}</p>
                <button
                    onClick={() => {
                        outputHandler(null)
                    }}
                >
                    Log Out
                </button>
            </>
        )
    }

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={yup.object({
                email: yup.string().email().required('Email is required'),
                password: yup.string().required('Password is required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setAuthError(null)
                try {
                    const response = await client.AuthController_signIn(null, {
                        email: values.email,
                        rawPassword: values.password,
                    })
                    const jwtPayload = jwtDecode(response.data.accessToken)
                    if (!isMyJwtPayload(jwtPayload)) {
                        throw new Error('Invalid JWT payload')
                    }
                    outputHandler({
                        accessToken: response.data.accessToken,
                        jwtPayload,
                    })
                } catch (error) {
                    if (isAxiosError(error) && error.status === 401) {
                        setAuthError('Invalid email or password')
                    } else if (
                        error instanceof Error &&
                        error.message === 'Invalid JWT payload'
                    ) {
                        setAuthError('Invalid JWT payload')
                        outputHandler(null)
                    } else {
                        throw error
                    }
                }
                setSubmitting(false)
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <label>
                        Email
                        <Field
                            type="email"
                            name="email"
                            disabled={isSubmitting}
                        />
                    </label>
                    <label>
                        Password
                        <Field
                            type="password"
                            name="password"
                            disabled={isSubmitting}
                        />
                    </label>
                    <button type="submit" disabled={isSubmitting}>
                        Log In
                    </button>
                    <ErrorMessage name="email" component="div" />
                    <ErrorMessage name="password" component="div" />
                    {authError == null ? null : <div>{authError}</div>}
                </Form>
            )}
        </Formik>
    )
}

export default AuthForm
