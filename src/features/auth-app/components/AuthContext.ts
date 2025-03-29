import { JwtPayload } from 'jwt-decode'
import { createContext } from 'react'

export const AuthContext = createContext<AuthContextValue | null>(null)

export interface MyJwtPayload extends JwtPayload {
    email: string
    sub: string
    iat: number
    exp: number
}
export interface AuthContextValue {
    accessToken: string
    jwtPayload: MyJwtPayload
}
export function isMyJwtPayload(value: JwtPayload): value is MyJwtPayload {
    return (
        'email' in value &&
        typeof value.email === 'string' &&
        'sub' in value &&
        typeof value.sub === 'string' &&
        'iat' in value &&
        typeof value.iat === 'number' &&
        'exp' in value &&
        typeof value.exp === 'number'
    )
}
