import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import TaskForm from './TaskForm'
import { act } from 'react'

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

describe('TaskForm', () => {
    const handleOutput = vi.fn()

    it('should load and display', () => {
        render(<TaskForm outputHandler={handleOutput} />)

        const button = screen.getByRole('button', { name: 'calculate button' })
        const inputs = screen.getAllByRole('textbox')
        const select = screen.getByRole('combobox')

        // button.click()

        expect(button).toBeDefined()
        expect(inputs).toHaveLength(2)
        expect(select).toBeDefined()
    })

    it('should run callback on submit', async () => {
        render(<TaskForm outputHandler={handleOutput} />)

        const button = screen.getByRole('button', { name: 'calculate button' })
        const input1 = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'count',
        })

        await act(async () => {
            fireEvent.change(input1, { target: { value: '98' } })
            button.click()
        })

        await sleep(100)
        expect(handleOutput).toHaveBeenCalled()
    })

    it('should be able to input number and select operator', () => {
        render(<TaskForm outputHandler={handleOutput} />)

        const input1 = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'count',
        })
        const input2 = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'count2',
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

    it('should run callback with correct values', async () => {
        render(<TaskForm outputHandler={handleOutput} />)

        const button = screen.getByRole('button', { name: 'calculate button' })
        const input1 = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'count',
        })
        const input2 = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'count2',
        })
        const select = screen.getByRole<HTMLSelectElement>('combobox')

        await act(async () => {
            fireEvent.change(input1, { target: { value: '98' } })
            fireEvent.change(input2, { target: { value: '2' } })
        })

        for (const [operator, value] of [
            ['/', 49],
            ['+', 100],
            ['-', 96],
            ['*', 196],
        ] as const) {
            await act(async () => {
                fireEvent.change(select, { target: { value: operator } })
                button.click()
            })
            // await sleep(100)
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

    it('should disable button when invalid', async () => {
        render(<TaskForm outputHandler={handleOutput} />)

        const button = screen.getByRole<HTMLButtonElement>('button', {
            name: 'calculate button',
        })
        const input1 = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'count',
        })
        const input2 = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'count2',
        })

        await act(async () => {
            fireEvent.change(input1, { target: { value: '98a' } })
            fireEvent.change(input2, { target: { value: '2b' } })
        })

        expect(button.disabled).toBe(true)
    })

    it('should error when input is empty', async () => {
        render(<TaskForm outputHandler={handleOutput} />)

        const input1 = screen.getByRole<HTMLInputElement>('textbox', {
            name: 'count',
        })

        await act(async () => {
            fireEvent.change(input1, { target: { value: '' } })
        })

        expect(screen.getByText('Count 1 is required')).toBeDefined()
    })
})
