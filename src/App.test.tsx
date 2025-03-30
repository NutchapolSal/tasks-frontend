import { render, screen } from '@testing-library/react'
import { describe, it, afterEach } from 'vitest'

import App from './App'
import { mockAuthContextValue } from './utils/mock-auth-values'
import './mock/auth-app/mock-auth'
import './mock/tasks-app/mock-tasks'

describe('App', () => {
    afterEach(() => {
        localStorage.removeItem('accessToken')
    })

    it('should display Auth on unauthenticated', async () => {
        render(<App />)
        screen.getByRole('heading', {
            name: 'Tasks App',
        })
        screen.getByRole<HTMLInputElement>('textbox', {
            name: 'Email',
        })
    })

    it('should display Tasks on authenticated', async () => {
        localStorage.setItem('accessToken', mockAuthContextValue.accessToken)

        render(<App />)
        screen.getByRole('heading', {
            name: 'Tasks App',
        })

        screen.getByRole('textbox', {
            name: 'Title',
        })
    })
})
