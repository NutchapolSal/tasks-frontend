import { FC, useContext } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { CreateTaskDto, Task } from '../../../../types/backend-openapi'
import { AuthContext } from '../../../auth-app/components/AuthContext'
import client from '../../../../utils/axios'

export interface TaskProps {
    task?: Task | null
    handleSubmit: (task: Task) => void
}

const TaskForm: FC<TaskProps> = ({ task, handleSubmit }) => {
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
            onSubmit={async (values, { setSubmitting }) => {
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
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <label>
                        Title
                        <Field
                            type="title"
                            name="title"
                            disabled={isSubmitting}
                            required
                        />
                    </label>
                    <label>
                        Description
                        <Field
                            type="description"
                            name="description"
                            disabled={isSubmitting}
                        />
                    </label>
                    <label>
                        <Field
                            type="radio"
                            name="status"
                            value="pending"
                            disabled={isSubmitting}
                        />
                        Pending
                    </label>
                    <label>
                        <Field
                            type="radio"
                            name="status"
                            value="in_progress"
                            disabled={isSubmitting}
                        />
                        In Progress
                    </label>
                    <label>
                        <Field
                            type="radio"
                            name="status"
                            value="completed"
                            disabled={isSubmitting}
                        />
                        Completed
                    </label>
                    <button type="submit" disabled={isSubmitting}>
                        {task == null ? 'Add' : 'Save'}
                    </button>
                    <ErrorMessage name="title" component="div" />
                    <ErrorMessage name="description" component="div" />
                </Form>
            )}
        </Formik>
    )
}

export default TaskForm
