import { FC, useContext } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { CreateTaskDto, Task } from '../../../../types/backend-openapi'
import { AuthContext } from '../../../auth-app/components/AuthContext/AuthContext'
import client from '../../../../utils/axios'
import { getTaskEmoji } from '../../common'

export interface TaskProps {
    task?: Task | null
    handleSubmit: (task: Task) => void
    children?: React.ReactNode
}

const TaskForm: FC<TaskProps> = ({ task, handleSubmit, children }) => {
    const authValue = useContext(AuthContext)

    if (authValue == null) {
        throw new TypeError('AuthContext should be provided')
    }

    return (
        <Formik
            initialValues={{
                title: task?.title ?? '',
                description: task?.description ?? '',
                status: task?.status ?? 'pending',
            }}
            validationSchema={yup.object({
                title: yup.string().required('Title is required'),
                description: yup.string(),
                status: yup
                    .mixed<Task['status']>()
                    .oneOf(['pending', 'in_progress', 'completed']),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                const newTask: CreateTaskDto = values

                let res
                if (task != null) {
                    res = await client.TasksController_patchTask(
                        { id: task.taskId },
                        newTask,
                        {
                            headers: {
                                Authorization: `Bearer ${authValue.accessToken}`,
                            },
                        }
                    )
                } else {
                    res = await client.TasksController_postTask(null, newTask, {
                        headers: {
                            Authorization: `Bearer ${authValue.accessToken}`,
                        },
                    })
                }

                handleSubmit(res.data)
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ isSubmitting }) => (
                <Form className="taskForm">
                    <div className="title">
                        <label>
                            Title
                            <Field
                                type="text"
                                name="title"
                                disabled={isSubmitting}
                                required
                            />
                        </label>
                    </div>
                    <div className="description">
                        <label>
                            Description
                            <Field
                                as="textarea"
                                name="description"
                                disabled={isSubmitting}
                            />
                        </label>
                    </div>
                    <div className="status">
                        <label>
                            <Field
                                type="radio"
                                name="status"
                                value="pending"
                                disabled={isSubmitting}
                            />
                            {getTaskEmoji('pending')} Pending
                        </label>
                        <label>
                            <Field
                                type="radio"
                                name="status"
                                value="in_progress"
                                disabled={isSubmitting}
                            />
                            {getTaskEmoji('in_progress')} In Progress
                        </label>
                        <label>
                            <Field
                                type="radio"
                                name="status"
                                value="completed"
                                disabled={isSubmitting}
                            />
                            {getTaskEmoji('completed')} Completed
                        </label>
                    </div>
                    <div className="actions">
                        <button type="submit" disabled={isSubmitting}>
                            {task == null ? 'Add' : 'Save'}
                        </button>
                        {children}
                    </div>
                    <div className="errors">
                        <ErrorMessage name="title" component="div" />
                        <ErrorMessage name="description" component="div" />
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default TaskForm
