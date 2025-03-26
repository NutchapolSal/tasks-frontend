import { useEffect, useState } from 'react'
import './App.css'
import { jwtDecode } from 'jwt-decode'
import AuthForm from './features/auth-app/components/AuthForm/AuthForm'
import {
    AuthContext,
    AuthContextValue,
    isMyJwtPayload,
} from './features/auth-app/components/AuthContext'

function App() {
    const [authContext, setAuthContext] = useState<AuthContextValue | null>(
        (() => {
            const accessToken = localStorage.getItem('accessToken')
            if (accessToken == null) {
                return null
            }
            const jwtPayload = jwtDecode(accessToken)
            if (!isMyJwtPayload(jwtPayload)) {
                return null
            }
            return { accessToken, jwtPayload }
        })()
    )

    useEffect(() => {
        if (authContext != null) {
            // https://portswigger.net/research/web-storage-the-lesser-evil-for-session-tokens
            localStorage.setItem('accessToken', authContext.accessToken)
        } else {
            localStorage.removeItem('accessToken')
        }
    }, [authContext])

    return (
        <>
            <h1>Tasks App</h1>
            <div className="card">
                <AuthContext.Provider value={authContext}>
                    <AuthForm outputHandler={setAuthContext} />
                </AuthContext.Provider>
            </div>
        </>
    )
}

export default App
