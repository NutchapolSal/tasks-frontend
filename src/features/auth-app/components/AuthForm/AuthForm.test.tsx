import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import AuthForm from './AuthForm'
import {
    mockAuthContextValue,
    mockAuthEmail,
    mockAuthEmailBad,
    mockAuthEmailInvalidToken,
    mockAuthPassword,
} from '../../../../utils/mock-auth-values'

import '../../../../mock/auth-app/mock-auth'

describe('AuthForm (Login)', () => {
    it('should load and display', async () => {
        render(
            <AuthForm
                handleAuthChange={vi.fn()}
                authError={null}
                setAuthError={vi.fn()}
                isRegistration={false}
            />
        )
        screen.getByRole('button', { name: 'Login' })
        screen.getByRole<HTMLInputElement>('textbox', {
            name: 'Email',
        })
        screen.getByLabelText<HTMLInputElement>('Password')
    })

    it('should correctly report errors and change AuthContextValue', async () => {
        const handleAuthChange = vi.fn()
        const setAuthError = vi.fn()
        render(
            <AuthForm
                handleAuthChange={handleAuthChange}
                authError={null}
                setAuthError={setAuthError}
                isRegistration={false}
            />
        )
        const user = userEvent.setup()

        const emailInput = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'Email',
        })
        const passwordInput =
            screen.getByLabelText<HTMLInputElement>('Password')
        const button = screen.getByRole('button', { name: 'Login' })

        await user.type(emailInput, mockAuthEmailBad)
        await user.type(passwordInput, mockAuthPassword)
        await user.click(button)

        expect(setAuthError).toHaveBeenCalledWith('Invalid email or password')
        expect(handleAuthChange).toHaveBeenCalledWith(null)

        await user.clear(emailInput)
        await user.type(emailInput, mockAuthEmail)
        await user.click(button)

        expect(setAuthError).toHaveBeenCalledWith(null)
        expect(handleAuthChange).toHaveBeenCalledWith(mockAuthContextValue)
    })
    it('should show and hide auth error', async () => {
        const setAuthError = vi.fn()
        render(
            <AuthForm
                handleAuthChange={vi.fn()}
                authError="Test Error"
                setAuthError={setAuthError}
                isRegistration={false}
            />
        )
        const user = userEvent.setup()

        await screen.findByText('Test Error')
        const emailInput = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'Email',
        })
        const passwordInput =
            screen.getByLabelText<HTMLInputElement>('Password')
        const button = screen.getByRole('button', { name: 'Login' })

        await user.type(emailInput, mockAuthEmail)
        await user.type(passwordInput, mockAuthPassword)
        await user.click(button)

        expect(setAuthError).toHaveBeenCalledWith(null)
    })
    it('should error on invalid JWT', async () => {
        const setAuthError = vi.fn()
        render(
            <AuthForm
                handleAuthChange={vi.fn()}
                authError={null}
                setAuthError={setAuthError}
                isRegistration={false}
            />
        )
        const user = userEvent.setup()

        const emailInput = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'Email',
        })
        const passwordInput =
            screen.getByLabelText<HTMLInputElement>('Password')
        const button = screen.getByRole('button', { name: 'Login' })

        await user.type(emailInput, mockAuthEmailInvalidToken)
        await user.type(passwordInput, mockAuthPassword)
        await user.click(button)

        expect(setAuthError).toHaveBeenCalledWith('Invalid JWT payload')
    })
})

describe('AuthForm (Register)', () => {
    it('should load and display', async () => {
        render(
            <AuthForm
                handleAuthChange={vi.fn()}
                authError={null}
                setAuthError={vi.fn()}
                isRegistration={true}
            />
        )
        screen.getByRole('button', { name: 'Register' })
        screen.getByRole<HTMLInputElement>('textbox', {
            name: 'Email',
        })
        screen.getByLabelText<HTMLInputElement>('Password')
        screen.getByLabelText<HTMLInputElement>('Repeat Password')
    })
    it('should correctly report errors', async () => {
        const handleAuthChange = vi.fn()
        const setAuthError = vi.fn()
        render(
            <AuthForm
                handleAuthChange={handleAuthChange}
                authError={null}
                setAuthError={setAuthError}
                isRegistration={true}
            />
        )
        const user = userEvent.setup()
        const button = screen.getByRole('button', { name: 'Register' })
        const emailInput = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'Email',
        })
        const passwordInput =
            screen.getByLabelText<HTMLInputElement>('Password')
        const repeatPasswordInput =
            screen.getByLabelText<HTMLInputElement>('Repeat Password')

        await user.type(emailInput, mockAuthEmailBad)
        await user.type(passwordInput, mockAuthPassword)
        await user.type(repeatPasswordInput, mockAuthPassword)
        await user.click(button)

        expect(setAuthError).toHaveBeenCalledWith('Account already exists')
        expect(handleAuthChange).toHaveBeenCalledWith(null)
    })

    it('should warn when passwords do not match', async () => {
        const setAuthError = vi.fn()
        render(
            <AuthForm
                handleAuthChange={vi.fn()}
                authError={null}
                setAuthError={setAuthError}
                isRegistration={true}
            />
        )
        const user = userEvent.setup()

        const emailInput = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'Email',
        })
        const passwordInput =
            screen.getByLabelText<HTMLInputElement>('Password')
        const repeatPasswordInput =
            screen.getByLabelText<HTMLInputElement>('Repeat Password')
        const button = screen.getByRole('button', { name: 'Register' })

        await user.type(emailInput, mockAuthEmail)
        await user.type(passwordInput, mockAuthPassword)
        await user.type(repeatPasswordInput, 'wrongpassword')
        await user.click(button)

        expect(setAuthError).toHaveBeenCalledWith('Passwords do not match')
    })

    it('should error when email already used', async () => {
        const setAuthError = vi.fn()
        render(
            <AuthForm
                handleAuthChange={vi.fn()}
                authError={null}
                setAuthError={setAuthError}
                isRegistration={true}
            />
        )
        const user = userEvent.setup()

        const emailInput = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'Email',
        })
        const passwordInput =
            screen.getByLabelText<HTMLInputElement>('Password')
        const repeatPasswordInput =
            screen.getByLabelText<HTMLInputElement>('Repeat Password')
        const button = screen.getByRole('button', { name: 'Register' })

        await user.type(emailInput, mockAuthEmailBad)
        await user.type(passwordInput, mockAuthPassword)
        await user.type(repeatPasswordInput, mockAuthPassword)
        await user.click(button)

        expect(setAuthError).toHaveBeenCalledWith(null)
    })
})
