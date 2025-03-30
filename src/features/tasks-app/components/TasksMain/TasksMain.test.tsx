import { act, render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import TasksMain from './TasksMain'
import { AuthContext } from '../../../auth-app/components/AuthContext/AuthContext'

import '../../../../mock/tasks-app/mock-tasks'
import { mockAuthContextValue } from '../../../../utils/mock-auth-values'
import userEvent from '@testing-library/user-event'
import { newTask, tasks } from '../../../../utils/mock-task-values'
import { getTaskEmoji } from '../../common'
import { sleep } from '../../../../utils/sleep'

describe('TasksMain', () => {
    it('should not load when no auth context', async () => {
        render(<TasksMain />)

        expect(screen.queryByRole('button', { name: 'Add' })).toBeNull()
        expect(screen.queryByRole('textbox', { name: 'Title' })).toBeNull()
        expect(
            screen.queryByRole('textbox', { name: 'Description' })
        ).toBeNull()
        expect(screen.queryByRole('list')).toBeNull()
    })

    it('should load and display', async () => {
        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TasksMain />
            </AuthContext.Provider>
        )
        await act(async () => {
            await sleep(0)
        })

        screen.getByRole('list')

        screen.getByRole('button', { name: 'Add' })
        screen.getByRole('textbox', { name: 'Title' })
        screen.getByRole('textbox', {
            name: 'Description',
        })
        const listItems = screen.getAllByRole('listitem')

        expect(listItems).toHaveLength(tasks.length)
    })
    it('should successfully add a task', async () => {
        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TasksMain />
            </AuthContext.Provider>
        )
        const user = userEvent.setup()

        const titleField = screen.getByRole('textbox', {
            name: 'Title',
        })
        const descriptionField = screen.getByRole('textbox', {
            name: 'Description',
        })
        const statusRadios = screen.getAllByRole<HTMLInputElement>('radio')
        const button = screen.getByRole('button', { name: 'Add' })

        await act(async () => {
            await user.clear(titleField)
            await user.clear(descriptionField)
            await user.type(titleField, newTask.title)
            for (const radio of statusRadios) {
                if (radio.value === newTask.status) {
                    await user.click(radio)
                    break
                }
            }
            await user.click(button)
        })

        screen.getByText('New Task')
    })
    it('should successfully edit a task', async () => {
        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TasksMain />
            </AuthContext.Provider>
        )
        await act(async () => {
            await sleep(0)
        })
        const user = userEvent.setup()

        const status1TaskButton = screen.getByRole('button', {
            name: getTaskEmoji('completed'),
        })
        expect(
            screen.queryAllByRole('button', {
                name: getTaskEmoji('pending'),
            })
        ).toHaveLength(1)

        await act(async () => {
            await user.click(status1TaskButton)
        })

        expect(
            screen.queryAllByRole('button', {
                name: getTaskEmoji('pending'),
            })
        ).toHaveLength(2)
    })
    it('should successfully delete a task', async () => {
        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <TasksMain />
            </AuthContext.Provider>
        )
        await act(async () => {
            await sleep(0)
        })
        const user = userEvent.setup()

        const deleteButtons = screen.getAllByRole('button', {
            name: '🗑️',
        })
        expect(deleteButtons).toHaveLength(tasks.length)

        await act(async () => user.click(deleteButtons[0]))
        const confirmButton = screen.getByRole('button', {
            name: '💥',
        })
        await act(async () => user.click(confirmButton))

        expect(screen.queryAllByRole('button', { name: '🗑️' })).toHaveLength(
            tasks.length - 1
        )
    })
})
