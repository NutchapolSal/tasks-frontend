import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import TaskItem from './TaskItem'

import { act } from 'react'
import { AuthContext } from '../../../auth-app/components/AuthContext'
import { mockAuthContextValue } from '../../../../utils/mock-auth-values'
import userEvent from '@testing-library/user-event'
import {
    status2Task,
    status1Task,
    newTask,
    patchedTask,
    status4Task,
    status3Task,
} from '../../../../utils/mock-task-values'

import '../../../../mock/tasks-app/mock-tasks'
import { getTaskEmoji } from '../../common'

describe('TaskItem', () => {
    it('should error if AuthContext is not provided', () => {
        expect(() => {
            render(
                <TaskItem
                    task={newTask}
                    handleEdit={vi.fn()}
                    handleDelete={vi.fn()}
                />
            )
        }).toThrowError()
    })
    it('should load and display', () => {
        const handleEdit = vi.fn()
        const handleDelete = vi.fn()

        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TaskItem
                    task={newTask}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </AuthContext.Provider>
        )

        screen.getByText(newTask.title)
        screen.getByRole('button', {
            name: getTaskEmoji(newTask.status),
        })
        screen.getByRole('button', {
            name: '📝',
        })
        screen.getByRole('button', {
            name: '🗑️',
        })
    })
    it('should handle status click', async () => {
        const handleEdit = vi.fn()
        const handleDelete = vi.fn()

        const result = render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TaskItem
                    task={status1Task}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </AuthContext.Provider>
        )

        const statusButton = screen.getByRole('button', {
            name: getTaskEmoji(status1Task.status),
        })

        await act(() => userEvent.click(statusButton))
        result.rerender(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TaskItem
                    task={status2Task}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </AuthContext.Provider>
        )
        await act(() => userEvent.click(statusButton))
        result.rerender(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TaskItem
                    task={status3Task}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </AuthContext.Provider>
        )
        await act(() => userEvent.click(statusButton))

        expect(handleEdit).toHaveBeenCalledWith(status2Task)
        expect(handleEdit).toHaveBeenCalledWith(status3Task)
        expect(handleEdit).toHaveBeenCalledWith(status4Task)
    })
    it('should handle edit click', async () => {
        const handleEdit = vi.fn()
        const handleDelete = vi.fn()

        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TaskItem
                    task={newTask}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </AuthContext.Provider>
        )
        const user = userEvent.setup()

        const editButton = screen.getByRole('button', {
            name: '📝',
        })

        await act(() => userEvent.click(editButton))

        // this is TaskForm tests leaking up
        const titleField = screen.getByRole('textbox', {
            name: 'Title',
        })
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

        // back to TaskItem tests
        expect(handleEdit).toHaveBeenCalledWith(patchedTask)
    })

    it('should handle edit then cancel', async () => {
        const handleEdit = vi.fn()
        const handleDelete = vi.fn()

        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TaskItem
                    task={newTask}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </AuthContext.Provider>
        )

        const editButton = screen.getByRole('button', {
            name: '📝',
        })

        await act(() => userEvent.click(editButton))

        const cancelButton = screen.getByRole('button', {
            name: 'Cancel',
        })

        expect(
            screen.queryByRole('button', {
                name: '📝',
            })
        ).toBeNull()

        await act(() => userEvent.click(cancelButton))

        screen.getByRole('button', {
            name: '📝',
        })
        expect(handleEdit).not.toHaveBeenCalled()
    })

    it('should handle delete click', async () => {
        const handleEdit = vi.fn()
        const handleDelete = vi.fn()

        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TaskItem
                    task={status2Task}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </AuthContext.Provider>
        )

        const deleteButton = screen.getByRole('button', {
            name: '🗑️',
        })

        await act(() => userEvent.click(deleteButton))

        const confirmButton = screen.getByRole('button', {
            name: '💥',
        })
        await act(() => userEvent.click(confirmButton))

        expect(handleDelete).toHaveBeenCalled()
    })

    it('should handle delete then cancel', async () => {
        const handleEdit = vi.fn()
        const handleDelete = vi.fn()

        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TaskItem
                    task={status2Task}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </AuthContext.Provider>
        )

        const deleteButton = screen.getByRole('button', {
            name: '🗑️',
        })

        await act(() => userEvent.click(deleteButton))

        screen.getByRole('button', {
            name: '💥',
        })
        const cancelButton = screen.getByRole('button', {
            name: '❌',
        })

        await act(() => userEvent.click(cancelButton))

        expect(
            screen.queryByRole('button', {
                name: '💥',
            })
        ).toBeNull()
        expect(handleDelete).not.toHaveBeenCalled()
    })
})
