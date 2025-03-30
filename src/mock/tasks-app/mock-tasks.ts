import { mockClient } from '../../utils/mock'
import { mockAuthContextValue } from '../../utils/mock-auth-values'
import {
    status2Task,
    newTask,
    patchedTask,
    status3Task,
    status4Task,
    tasks,
    status1Task,
    anotherTask,
} from '../../utils/mock-task-values'

const authHeaderMatcher: Parameters<(typeof mockClient)['onPatch']>[2] = {
    headers: {
        // @ts-expect-error asymmetricMatch is not properly typed
        asymmetricMatch: (headers) =>
            headers.Authorization ===
            `Bearer ${mockAuthContextValue.accessToken}`,
    },
}

mockClient.onGet('/tasks', authHeaderMatcher).reply(200, tasks)

mockClient
    .onPost(
        '/tasks',
        {
            title: 'New Task',
            description: '',
            status: 'pending',
        },
        authHeaderMatcher
    )
    .reply(201, newTask)

mockClient
    .onPatch(
        `/tasks/${patchedTask.taskId}`,
        {
            title: patchedTask.title,
            description: patchedTask.description,
            status: patchedTask.status,
        },
        authHeaderMatcher
    )
    .reply(200, patchedTask)
    .onPatch(
        `/tasks/${status2Task.taskId}`,
        {
            status: status2Task.status,
        },
        authHeaderMatcher
    )
    .reply(200, status2Task)
    .onPatch(
        `/tasks/${status3Task.taskId}`,
        {
            status: status3Task.status,
        },
        authHeaderMatcher
    )
    .reply(200, status3Task)
    .onPatch(
        `/tasks/${status4Task.taskId}`,
        {
            status: status4Task.status,
        },
        authHeaderMatcher
    )
    .reply(200, status4Task)

mockClient
    .onDelete(`/tasks/${status2Task.taskId}`, authHeaderMatcher)
    .reply(200, undefined)
    .onDelete(`/tasks/${status1Task.taskId}`, authHeaderMatcher)
    .reply(200, undefined)
    .onDelete(`/tasks/${anotherTask.taskId}`, authHeaderMatcher)
    .reply(200, undefined)
