import { FC, useContext, useState } from 'react'
import { Task } from '../../../../types/backend-openapi'
import TaskForm from '../TaskForm'
import client from '../../../../utils/axios'
import { AuthContext } from '../../../auth-app/components/AuthContext'
import { getTaskEmoji, getTaskStatus } from '../../common'

export interface TaskProps {
    task: Task
    handleEdit: (task: Task) => void
    handleDelete: () => void
}

const TaskItem: FC<TaskProps> = ({ task, handleEdit, handleDelete }) => {
    const authValue = useContext(AuthContext)

    const [editing, setEditing] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const expandable = task.description != ''

    if (authValue == null) {
        throw new TypeError('AuthContext should be provided')
    }
    const handleStatusClick = async () => {
        let newStatus: Task['status']
        switch (task.status) {
            case 'pending':
                newStatus = 'in_progress'
                break
            case 'in_progress':
                newStatus = 'completed'
                break
            case 'completed':
                newStatus = 'pending'
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

    const handleExpandClick = () => {
        if (!expandable) {
            setExpanded(false)
            return
        }

        setExpanded(!expanded)
    }

    if (editing) {
        return (
            <li className="taskItem">
                <TaskForm
                    key={task.taskId}
                    task={task}
                    handleSubmit={(task) => {
                        setEditing(false)
                        handleEdit(task)
                    }}
                >
                    <button type="button" onClick={() => setEditing(false)}>
                        Cancel
                    </button>
                </TaskForm>
            </li>
        )
    }

    return (
        <li className="taskItem">
            <button
                onClick={handleStatusClick}
                title={getTaskStatus(task.status)}
            >
                {getTaskEmoji(task.status)}
            </button>
            <div
                className={`content ${expandable ? 'expandable' : ''}`}
                onClick={handleExpandClick}
            >
                <p className="title">{task.title}</p>
                {task.description != '' ? (
                    <p className={`description ${expanded ? 'expanded' : ''}`}>
                        {task.description}
                    </p>
                ) : null}
            </div>

            {deleting ? (
                <>
                    <button
                        className="danger"
                        onClick={handleDelete}
                        title="Confirm Delete"
                    >
                        💥
                    </button>
                    <button
                        onClick={() => setDeleting(false)}
                        title="Cancel Delete"
                    >
                        ❌
                    </button>
                </>
            ) : (
                <>
                    <button onClick={() => setEditing(true)} title="Edit">
                        📝
                    </button>
                    <button onClick={() => setDeleting(true)} title="Delete">
                        🗑️
                    </button>
                </>
            )}
        </li>
    )
}

export default TaskItem
