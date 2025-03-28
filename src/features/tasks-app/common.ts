import { Task } from '../../types/backend-openapi'

export function getTaskEmoji(status: Task['status']) {
    switch (status) {
        case 'completed':
            return '✅'
        case 'in_progress':
            return '*️⃣'
        case 'pending':
            return '⬜'
    }
}

export function getTaskStatus(status: Task['status']) {
    switch (status) {
        case 'completed':
            return 'Completed'
        case 'in_progress':
            return 'In Progress'
        case 'pending':
            return 'Pending'
    }
}
