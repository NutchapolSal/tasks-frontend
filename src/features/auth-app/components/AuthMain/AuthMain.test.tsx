import { act, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import AuthMain from './AuthMain'
import { AuthContext } from '../AuthContext'
import {
    mockAuthContextValue,
    mockAuthContextValueExpired,
    mockAuthContextValueOld,
} from '../../../../utils/mock-auth-values'
import '../../../../mock/auth-app/mock-auth'
import userEvent from '@testing-library/user-event'

describe('AuthMain', () => {
    it('should display AuthForm on unauthenticated', async () => {
        const handleAuthChange = vi.fn()
        const result = render(<AuthMain handleAuthChange={handleAuthChange} />)
        const user = userEvent.setup()

        screen.getByRole<HTMLInputElement>('textbox', {
            name: 'Email',
        })
        const goToRegisterButton = screen.getByRole('button', {
            name: "I don't have an account",
        })

        await user.click(goToRegisterButton)
        await act(async () => {
            result.rerender(<AuthMain handleAuthChange={handleAuthChange} />)
        })
        screen.getByLabelText<HTMLInputElement>('Repeat Password')
        screen.getByRole('button', {
            name: 'I already have an account',
        })
    })

    it('should successfully log out', async () => {
        const handleAuthChange = vi.fn()
        await act(async () => {
            render(
                <AuthContext.Provider value={mockAuthContextValue}>
                    <AuthMain handleAuthChange={handleAuthChange} />
                </AuthContext.Provider>
            )
        })
        const user = userEvent.setup()

        const logoutButton = screen.getByRole('button', { name: 'Log Out' })

        await user.click(logoutButton)
        expect(handleAuthChange).toHaveBeenCalledWith(null)
    })

    it('should successfully refresh accessToken', async () => {
        const handleAuthChange = vi.fn()
        await act(async () => {
            render(
                <AuthContext.Provider value={mockAuthContextValueOld}>
                    <AuthMain handleAuthChange={handleAuthChange} />
                </AuthContext.Provider>
            )
        })
        expect(handleAuthChange).toHaveBeenCalledWith(mockAuthContextValue)
    })

    it('should clear Auth when session expired', async () => {
        const handleAuthChange = vi.fn()
        await act(async () => {
            render(
                <AuthContext.Provider value={mockAuthContextValueExpired}>
                    <AuthMain handleAuthChange={handleAuthChange} />
                </AuthContext.Provider>
            )
        })
        expect(handleAuthChange).toHaveBeenCalledWith(null)
    })
})
