import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import App from './App'

describe('App', () => {
    it('should display Vite and React logos', () => {
        render(<App />)

        const viteLogo = screen.getByAltText('Vite logo')
        const reactLogo = screen.getByAltText('React logo')

        expect(viteLogo).toBeDefined()
        expect(reactLogo).toBeDefined()
    })

    it('should display input form', () => {
        render(<App />)

        const input1 = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'count',
        })
        const input2 = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'count2',
        })
        const operator = screen.getByRole<HTMLSelectElement>('combobox', {
            name: 'select operator',
        })
        const operateButton = screen.getByRole<HTMLButtonElement>('button', {
            name: 'calculate button',
        })

        fireEvent.change(input1, { target: { value: '50' } })
        fireEvent.change(input2, { target: { value: '4' } })
        fireEvent.change(operator, { target: { value: '*' } })
        fireEvent.click(operateButton)

        expect(input1.value).toBe('50')
        expect(input2.value).toBe('4')
        expect(operator.value).toBe('*')

        fireEvent.change(input1, { target: { value: '100' } })
        fireEvent.change(input2, { target: { value: '2' } })
        fireEvent.change(operator, { target: { value: '-' } })
        fireEvent.click(operateButton)

        expect(input1.value).toBe('100')
        expect(input2.value).toBe('2')
        expect(operator.value).toBe('-')

        const deleteButton = screen.getByRole('button', {
            name: '🗑️ result 200',
        })
        expect(deleteButton).toBeDefined()
        fireEvent.click(deleteButton)

        const restoreButton = screen.getByRole('button', {
            name: '🔄 result 200',
        })
        expect(restoreButton).toBeDefined()
        fireEvent.click(restoreButton)
    })
})
