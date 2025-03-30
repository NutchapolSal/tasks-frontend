import { FC, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../auth-app/components/AuthContext/AuthContext'
import { Task } from '../../../../types/backend-openapi'
import client from '../../../../utils/axios'
import TaskForm from '../TaskForm'
import TaskItem from '../TaskItem'

const TasksMain: FC = () => {
    const authValue = useContext(AuthContext)

    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        if (authValue == null) {
            setTasks([])
            return
        }
        // fetch tasks
        client
            .TasksController_getTasks(null, null, {
                headers: {
                    Authorization: `Bearer ${authValue.accessToken}`,
                },
            })
            .then((response) => {
                response.data.sort((a, b) =>
                    b.createdAt.localeCompare(a.createdAt)
                )
                setTasks(response.data)
            })
    }, [authValue])

    const handleNew = (task: Task) => {
        setTasks([task, ...tasks])
    }

    const handleEdit = (task: Task) => {
        const newTasks = tasks.map((t) => (t.taskId === task.taskId ? task : t))
        setTasks(newTasks)
    }

    const handleDelete = (taskId: string) => {
        const newTasks = tasks.filter((t) => t.taskId !== taskId)
        setTasks(newTasks)
    }

    if (authValue == null) {
        return
    }

    return (
        <ul className="tasksList">
            {tasks.map((task) => (
                <TaskItem
                    key={task.taskId}
                    task={task}
                    handleEdit={(newTask) => handleEdit(newTask)}
                    handleDelete={() => handleDelete(task.taskId)}
                />
            ))}

            <TaskForm handleSubmit={handleNew} />
        </ul>
    )
}

export default TasksMain
