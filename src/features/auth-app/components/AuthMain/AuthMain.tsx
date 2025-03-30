import { FC, useContext, useEffect, useState } from 'react'
import client from '../../../../utils/axios'
import { isAxiosError } from 'axios'
import { AuthContext, AuthContextValue, isMyJwtPayload } from '../AuthContext'
import { jwtDecode } from 'jwt-decode'
import AuthMoreDialog from '../AuthMoreDialog'
import AuthForm from '../AuthForm'

export interface AuthMainProps {
    handleAuthChange: (authValue: AuthContextValue | null) => void
}

const AuthMain: FC<AuthMainProps> = ({ handleAuthChange }) => {
    const authValue = useContext(AuthContext)
    const [authError, setAuthError] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [registerOpen, setRegisterOpen] = useState(false)

    const refreshAccessToken = async (
        accessToken: string,
        handleAuthChange: AuthMainProps['handleAuthChange']
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
            handleAuthChange({
                accessToken: response.data.accessToken,
                jwtPayload,
            })
        } catch (error) {
            if (isAxiosError(error) && error.status === 401) {
                setAuthError('Session has expired, Please log in again')
                handleAuthChange(null)
            } else if (error instanceof Error || isAxiosError(error)) {
                setAuthError(error.message)
                handleAuthChange(null)
            } else {
                throw error
            }
        }
    }

    const handleRegisterSwitch = () => {
        setRegisterOpen(!registerOpen)
        setAuthError(null)
    }

    // refresh on first render
    useEffect(() => {
        if (authValue == null) {
            return
        }
        refreshAccessToken(authValue.accessToken, handleAuthChange)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // then refresh on almost expiry
    useEffect(() => {
        if (authValue == null) {
            return
        }

        const secsToExpiry = Math.max(
            0,
            authValue.jwtPayload.exp - Date.now() / 1000
        )

        if (secsToExpiry == 0) {
            setAuthError('Session has expired, Please log in again')
            handleAuthChange(null)
            return
        }

        const refreshIntervalId = setTimeout(
            () => refreshAccessToken(authValue.accessToken, handleAuthChange),
            Math.min(secsToExpiry * 1000 * 0.9, 1000 * 60)
        )

        return () => clearTimeout(refreshIntervalId)
    }, [authValue, handleAuthChange])

    if (authValue != null) {
        return (
            <div className="auth">
                <span>Logged in as {authValue.jwtPayload.email}</span>
                <button
                    onClick={() => {
                        handleAuthChange(null)
                    }}
                >
                    Log Out
                </button>
                <button
                    onClick={() => {
                        setDialogOpen(!dialogOpen)
                    }}
                >
                    ≡
                </button>
                <AuthMoreDialog
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                    handleAuthChange={handleAuthChange}
                />
            </div>
        )
    }

    return (
        <>
            <AuthForm
                handleAuthChange={handleAuthChange}
                setAuthError={setAuthError}
                authError={authError}
                isRegistration={registerOpen}
            />
            <button onClick={handleRegisterSwitch}>
                I {registerOpen ? 'already' : "don't"} have an account
            </button>
        </>
    )
}

export default AuthMain
