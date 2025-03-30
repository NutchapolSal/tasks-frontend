import { render } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import '../../../../mock/auth-app/mock-auth'
import { mockAuthContextValue } from '../../../../utils/mock-auth-values'
import { AuthContext } from '../AuthContext'
import AuthMoreDialog from './AuthMoreDialog'

describe('AuthMoreDialog', () => {
    // TODO: write tests when dialog is properly implemented in jsdom
    // current problems:
    // - showModal and close methods do not exist
    // - screen.findBy* methods do not work with things inside dialog

    beforeAll(() => {
        HTMLDialogElement.prototype.showModal = vi.fn()
        HTMLDialogElement.prototype.close = vi.fn()
    })

    it('should load and display', async () => {
        const handleAuthChange = vi.fn()
        const setDialogOpen = vi.fn()
        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <AuthMoreDialog
                    handleAuthChange={handleAuthChange}
                    setDialogOpen={setDialogOpen}
                    dialogOpen={true}
                />
            </AuthContext.Provider>
        )

        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
    })
})
