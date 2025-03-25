import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import Result from './Result'

describe('Result', () => {
    const handleDelete = vi.fn()

    it('should load and display', () => {
        render(
            <Result
                calcs={[
                    {
                        id: 'asdasf',
                        count: 2,
                        operator: '+',
                        count2: 2,
                        output: 4,
                        removed: false,
                    },
                ]}
                buttonText="🗑️"
                callback={handleDelete}
            />
        )

        const button = screen.getByRole('button', { name: '🗑️ result 4' })
        expect(button).toBeDefined()
    })
    it('should run callback on delete', () => {
        render(
            <Result
                calcs={[
                    {
                        id: 'asdasf',
                        count: 2,
                        operator: '+',
                        count2: 2,
                        output: 4,
                        removed: false,
                    },
                ]}
                buttonText="🗑️"
                callback={handleDelete}
            />
        )

        const button = screen.getByRole('button', { name: '🗑️ result 4' })

        button.click()
        expect(handleDelete).toHaveBeenCalledWith('asdasf')
    })
})
