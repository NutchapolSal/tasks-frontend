import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import Form from './Form'

describe('Form', () => {
    const handleOutput = vi.fn()

    it('should load and display', () => {
        render(<Form outputHandler={handleOutput} />)

        const button = screen.getByRole('button', { name: 'calculate button' })
        const inputs = screen.getAllByRole('textbox')
        const select = screen.getByRole('combobox')

        // button.click()

        expect(button).toBeDefined()
        expect(inputs).toHaveLength(2)
        expect(select).toBeDefined()
    })

    it('should run callback on submit', () => {
        render(<Form outputHandler={handleOutput} />)

        const button = screen.getByRole('button', { name: 'calculate button' })
        button.click()

        expect(handleOutput).toHaveBeenCalled()
    })

    it('should be able to input number and select operator', () => {
        render(<Form outputHandler={handleOutput} />)

        const input1 = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'input1',
        })
        const input2 = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'input2',
        })
        const select = screen.getByRole<HTMLSelectElement>('combobox')

        expect(input1).toBeDefined()
        expect(input2).toBeDefined()
        expect(select).toBeDefined()

        fireEvent.change(input1, { target: { value: '98' } })
        fireEvent.change(input2, { target: { value: '2' } })
        fireEvent.change(select, { target: { value: '-' } })

        expect(input1.value).toBe('98')
        expect(input2.value).toBe('2')
        expect(select.value).toBe('-')
    })

    it('should run callback with correct values', () => {
        render(<Form outputHandler={handleOutput} />)

        const button = screen.getByRole('button', { name: 'calculate button' })
        const input1 = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'input1',
        })
        const input2 = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'input2',
        })
        const select = screen.getByRole<HTMLSelectElement>('combobox')

        fireEvent.change(input1, { target: { value: '98' } })
        fireEvent.change(input2, { target: { value: '2' } })

        for (const [operator, value] of [
            ['/', 49],
            ['+', 100],
            ['-', 96],
            ['*', 196],
        ] as const) {
            fireEvent.change(select, { target: { value: operator } })
            button.click()
            expect(handleOutput).toHaveBeenCalledWith({
                id: expect.any(String),
                removed: false,
                count: 98,
                operator: operator,
                count2: 2,
                output: value,
            })
        }
    })
})
