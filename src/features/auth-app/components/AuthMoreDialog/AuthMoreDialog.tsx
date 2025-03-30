import { FC, useContext, useEffect, useRef, useState } from 'react'
import { AuthContext, AuthContextValue } from '../AuthContext'
import client from '../../../../utils/axios'
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { isAxiosError } from 'axios'

export interface AuthMoreDialogProps {
    dialogOpen: boolean
    setDialogOpen: (open: boolean) => void
    handleAuthChange: (authValue: AuthContextValue | null) => void
}

const AuthMoreDialog: FC<AuthMoreDialogProps> = ({
    handleAuthChange,
    setDialogOpen,
    dialogOpen,
}) => {
    const authValue = useContext(AuthContext)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [updateEmailStatus, setUpdateEmailStatus] = useState<
        true | string | null
    >(null)
    const [updatePasswordStatus, setUpdatePasswordStatus] = useState<
        true | string | null
    >(null)

    useEffect(() => {
        if (dialogRef.current == null) {
            return
        }
        if (dialogRef.current.open && !dialogOpen) {
            dialogRef.current.close()
        } else if (!dialogRef.current.open && dialogOpen) {
            dialogRef.current.showModal()
        }
    }, [dialogOpen])

    useEffect(() => {
        if (updateEmailStatus === null) {
            return
        }
        const timeout = setTimeout(() => {
            setUpdateEmailStatus(null)
        }, 5000)
        return () => {
            clearTimeout(timeout)
        }
    }, [updateEmailStatus])

    useEffect(() => {
        if (updatePasswordStatus === null) {
            return
        }
        const timeout = setTimeout(() => {
            setUpdatePasswordStatus(null)
        }, 5000)
        return () => {
            clearTimeout(timeout)
        }
    }, [updatePasswordStatus])

    const handleLogOutAll = async () => {
        if (authValue == null) {
            return
        }
        await client.AuthController_clearAllSessions(null, null, {
            headers: {
                Authorization: `Bearer ${authValue.accessToken}`,
            },
        })
        handleAuthChange(null)
        setDialogOpen(false)
    }

    return (
        <dialog
            className="authMore"
            ref={dialogRef}
            onClose={() => setDialogOpen(false)}
        >
            <Formik
                initialValues={{ email: authValue?.jwtPayload.email ?? '' }}
                onSubmit={async (values, { setSubmitting }) => {
                    if (authValue == null) {
                        return
                    }
                    try {
                        await client.AuthController_patchUser(
                            null,
                            { email: values.email },
                            {
                                headers: {
                                    Authorization: `Bearer ${authValue.accessToken}`,
                                },
                            }
                        )
                        setUpdateEmailStatus(true)
                    } catch (error) {
                        if (isAxiosError(error) && error.status === 403) {
                            setUpdateEmailStatus('This email is already taken')
                        } else if (
                            error instanceof Error ||
                            isAxiosError(error)
                        ) {
                            setUpdateEmailStatus(error.message)
                        } else {
                            throw error
                        }
                    }
                    setSubmitting(false)
                }}
                validationSchema={yup.object({
                    email: yup
                        .string()
                        .email('Invalid email')
                        .required('Required'),
                })}
            >
                {({ isSubmitting, isValid, dirty }) => (
                    <Form>
                        <Field
                            name="email"
                            type="email"
                            placeholder="Email"
                            disabled={isSubmitting}
                            aria-label="Update Email"
                        />
                        <button
                            type="submit"
                            disabled={!(!isSubmitting && isValid && dirty)}
                        >
                            Update Email
                        </button>
                        {updateEmailStatus !== null ? (
                            updateEmailStatus === true ? (
                                <span>✅</span>
                            ) : (
                                <span>⚠️ {updateEmailStatus}</span>
                            )
                        ) : null}
                    </Form>
                )}
            </Formik>
            <Formik
                initialValues={{ oldPassword: '', newPassword: '' }}
                onSubmit={async (values, { setSubmitting }) => {
                    if (authValue == null) {
                        return
                    }

                    try {
                        await client.AuthController_patchUser(
                            null,
                            {
                                rawOldPassword: values.oldPassword,
                                rawNewPassword: values.newPassword,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${authValue.accessToken}`,
                                },
                            }
                        )
                        setUpdatePasswordStatus(true)
                    } catch (error) {
                        if (isAxiosError(error) && error.status === 403) {
                            setUpdatePasswordStatus('Incorrect old password')
                        } else if (
                            error instanceof Error ||
                            isAxiosError(error)
                        ) {
                            setUpdatePasswordStatus(error.message)
                        } else {
                            throw error
                        }
                    }
                    setSubmitting(false)
                }}
                validationSchema={yup.object({
                    oldPassword: yup.string().required('Required'),
                    newPassword: yup.string().required('Required'),
                })}
            >
                {({ isSubmitting, isValid, dirty }) => (
                    <Form>
                        <Field
                            name="oldPassword"
                            type="password"
                            placeholder="Old Password"
                            disabled={isSubmitting}
                        />
                        <Field
                            name="newPassword"
                            type="password"
                            placeholder="New Password"
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            disabled={!(!isSubmitting && isValid && dirty)}
                        >
                            Update Password
                        </button>
                        {updatePasswordStatus !== null ? (
                            updatePasswordStatus === true ? (
                                <span>✅</span>
                            ) : (
                                <span>⚠️ {updatePasswordStatus}</span>
                            )
                        ) : null}
                    </Form>
                )}
            </Formik>
            <button className="danger" onClick={handleLogOutAll}>
                Log Out from all devices
            </button>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    )
}

export default AuthMoreDialog
