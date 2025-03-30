import { Task } from '../types/backend-openapi'
import { mockAuthUUID } from './mock-auth-values'

export const anotherTask: Task = {
    taskId: '8a6c2235-cf93-4343-8aa3-eaace3e849fa',
    title: 'one',
    description: '',
    status: 'pending',
    userId: mockAuthUUID,
    createdAt: '2025-03-29T16:00:14.717Z',
    updatedAt: '2025-03-29T16:34:09.411Z',
}

export const newTask: Task = {
    taskId: '86588f54-1d5c-4d07-8c48-a842945e241b',
    title: 'New Task',
    description: '',
    status: 'pending',
    userId: mockAuthUUID,
    createdAt: '2025-03-29T16:34:21.402Z',
    updatedAt: '2025-03-29T16:34:21.402Z',
}

export const patchedTask: Task = {
    ...newTask,
    description: 'its not new anymore',
    status: 'in_progress',
    updatedAt: '2025-03-29T16:34:22.402Z',
}

export const status1Task: Task = {
    taskId: 'd35efa0b-918d-4c51-b3d8-a068d266ff25',
    title: 'uwah',
    description: 'uwah',
    status: 'completed',
    userId: mockAuthUUID,
    createdAt: '2025-03-29T16:34:27.402Z',
    updatedAt: '2025-03-29T16:34:27.402Z',
}

export const status2Task: Task = {
    ...status1Task,
    status: 'pending',
    updatedAt: '2025-03-29T16:34:30.402Z',
}
export const status3Task: Task = {
    ...status1Task,
    status: 'in_progress',
    updatedAt: '2025-03-29T16:34:33.402Z',
}
export const status4Task: Task = {
    ...status1Task,
    status: 'completed',
    updatedAt: '2025-03-29T16:34:36.402Z',
}

export const tasks: Task[] = [anotherTask, status1Task]
