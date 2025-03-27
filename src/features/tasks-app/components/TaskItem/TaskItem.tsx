import { FC, useContext, useState } from 'react'
import { Task } from '../../../../types/backend-openapi'
import TaskForm from '../TaskForm'
import client from '../../../../utils/axios'
import { AuthContext } from '../../../auth-app/components/AuthContext'

export interface TaskProps {
    task: Task
    handleEdit: (task: Task) => void
    handleDelete: () => void
}

function getTaskEmoji(status: Task['status']) {
    switch (status) {
        case 'completed':
            return '✅'
        case 'in_progress':
            return '*️⃣'
        case 'pending':
            return '⬜'
    }
}

const TaskItem: FC<TaskProps> = ({ task, handleEdit, handleDelete }) => {
    const authValue = useContext(AuthContext)

    const [editing, setEditing] = useState(false)
    const [deleting, setDeleting] = useState(false)

    if (authValue == null) {
        throw new TypeError('AuthContext should be provided')
    }
    const handleStatusClick = async () => {
        let newStatus
        switch (task.status) {
            case 'pending':
                newStatus = 'in_progress' as const
                break
            case 'in_progress':
                newStatus = 'completed' as const
                break
            case 'completed':
                newStatus = 'pending' as const
                break
        }

        await client.TasksController_patchTask(
            { id: task.taskId },
            { status: newStatus },
            {
                headers: {
                    Authorization: `Bearer ${authValue.accessToken}`,
                },
            }
        )

        handleEdit({ ...task, status: newStatus })
    }

    if (editing) {
        return (
            <>
                <TaskForm
                    key={task.taskId}
                    task={task}
                    handleSubmit={(task) => {
                        setEditing(false)
                        handleEdit(task)
                    }}
                />
                <button onClick={() => setEditing(false)}>🔙</button>
            </>
        )
    }

    if (deleting) {
        return (
            <li>
                <button onClick={handleStatusClick}>
                    {getTaskEmoji(task.status)}
                </button>
                <span>{task.title}</span>
                <span>🗑️</span>
                <button onClick={handleDelete}>💥</button>
                <button onClick={() => setDeleting(false)}>🔙</button>
            </li>
        )
    }

    return (
        <li>
            <button onClick={handleStatusClick}>
                {getTaskEmoji(task.status)}
            </button>
            <span>{task.title}</span>
            <button onClick={() => setEditing(true)}>📝</button>
            <button onClick={() => setDeleting(true)}>🗑️</button>
        </li>
    )
}

export default TaskItem
