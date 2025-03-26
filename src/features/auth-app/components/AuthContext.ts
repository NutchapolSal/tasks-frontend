import { JwtPayload } from 'jwt-decode'
import { createContext } from 'react'

export const AuthContext = createContext<AuthContextValue | null>(null)

export interface MyJwtPayload extends JwtPayload {
    email: string
}
export interface AuthContextValue {
    accessToken: string
    jwtPayload: MyJwtPayload
}
export function isMyJwtPayload(value: JwtPayload): value is MyJwtPayload {
    return 'email' in value && typeof value.email === 'string'
}
