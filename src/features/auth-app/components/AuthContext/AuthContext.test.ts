import { describe, it, expect } from 'vitest'
import { isMyJwtPayload } from './AuthContext'

describe('AuthContext', () => {
    it('should properly parse MyJwtToken', async () => {
        expect(isMyJwtPayload({})).toBe(false)
        expect(
            isMyJwtPayload({
                sub: 'asdf',
                iat: 0,
                exp: 0,
            })
        ).toBe(false)

        expect(
            isMyJwtPayload({
                // @ts-expect-error this is what jwt-decode returns
                email: 'asdf',
                sub: 'asdf',
                iat: 0,
                exp: 0,
            })
        ).toBe(true)
    })
})
