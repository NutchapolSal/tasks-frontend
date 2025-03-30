import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import TaskForm from './TaskForm'
import { act } from 'react'
import { AuthContext } from '../../../auth-app/components/AuthContext'
import { mockAuthContextValue } from '../../../../utils/mock-auth-values'
import userEvent from '@testing-library/user-event'
import { newTask, patchedTask } from '../../../../utils/mock-task-values'

import '../../../../mock/tasks-app/mock-tasks'

describe('TaskForm', () => {
    it('should error if AuthContext is not provided', () => {
        expect(() => {
            render(<TaskForm handleSubmit={vi.fn()} />)
        }).toThrowError()
    })
    it('should load and display (including children buttons)', () => {
        const handleSubmit = vi.fn()

        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TaskForm handleSubmit={handleSubmit}>
                    <button type="button">Extra button</button>
                </TaskForm>
            </AuthContext.Provider>
        )
        screen.getByRole('textbox', { name: 'Title' })
        screen.getByRole('textbox', {
            name: 'Description',
        })
        const statusRadios = screen.getAllByRole('radio')
        screen.getByRole('button', { name: 'Add' })
        screen.getByRole('button', { name: 'Extra button' })

        expect(statusRadios).toHaveLength(3)
    })
    it('should correctly handle adding a task', async () => {
        const handleSubmit = vi.fn()
        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TaskForm handleSubmit={handleSubmit}>
                    <button type="button">Extra button</button>
                </TaskForm>
            </AuthContext.Provider>
        )
        const user = userEvent.setup()
        const titleField = screen.getByRole('textbox', { name: 'Title' })
        const statusRadios = screen.getAllByRole<HTMLInputElement>('radio')
        const button = screen.getByRole('button', { name: 'Add' })
        await act(async () => {
            await user.type(titleField, newTask.title)
            for (const radio of statusRadios) {
                if (radio.value === newTask.status) {
                    await user.click(radio)
                    break
                }
            }
            await user.click(button)
        })
        expect(handleSubmit).toHaveBeenCalledWith(newTask)
    })
    it('should correctly handle editing a task', async () => {
        const handleSubmit = vi.fn()
        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TaskForm task={newTask} handleSubmit={handleSubmit}>
                    <button type="button">Extra button</button>
                </TaskForm>
            </AuthContext.Provider>
        )
        const user = userEvent.setup()
        const titleField = screen.getByRole('textbox', { name: 'Title' })
        const descriptionField = screen.getByRole('textbox', {
            name: 'Description',
        })
        const statusRadios = screen.getAllByRole<HTMLInputElement>('radio')
        const button = screen.getByRole('button', { name: 'Save' })
        await act(async () => {
            await user.clear(titleField)
            await user.clear(descriptionField)
            await user.type(titleField, patchedTask.title)
            await user.type(descriptionField, patchedTask.description)
            for (const radio of statusRadios) {
                if (radio.value === patchedTask.status) {
                    await user.click(radio)
                    break
                }
            }
            await user.click(button)
        })
        expect(handleSubmit).toHaveBeenCalledWith(patchedTask)
    })
})
