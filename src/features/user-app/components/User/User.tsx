import { FC, useState } from 'react'
import { UserType } from '../../../../utils/types'
import UserForm from '../UserForm/UserForm'

interface UserFormProps {
    users: UserType[]
    onCreate: (user: Omit<UserType, 'idcust'>) => void
    onUpdate: (user: UserType) => void
    onDelete: (id: number) => void
}

const User: FC<UserFormProps> = ({ users, onCreate, onUpdate, onDelete }) => {
    const [editings, setEditings] = useState(new Set<number>())
    const [creating, setCreating] = useState(false)

    const handleEdit = (idcust: number) => {
        editings.add(idcust)
        setEditings(new Set(editings))
    }
    const handleUnEdit = (idcust: number) => {
        editings.delete(idcust)
        setEditings(new Set(editings))
    }

    return (
        <div>
            {creating ? (
                <UserForm<false>
                    user={null}
                    onSubmit={(user) => {
                        onCreate(user)
                        setCreating(false)
                    }}
                    onCancel={() => {
                        setCreating(false)
                    }}
                />
            ) : (
                <button
                    type="button"
                    onClick={() => {
                        setCreating(true)
                    }}
                >
                    ➕
                </button>
            )}
            {users.map((user) => {
                if (editings.has(user.idcust)) {
                    return (
                        <UserForm<true>
                            key={user.idcust}
                            user={user}
                            onSubmit={(user) => {
                                onUpdate(user)
                                handleUnEdit(user.idcust)
                            }}
                            onCancel={() => {
                                handleUnEdit(user.idcust)
                            }}
                        />
                    )
                }

                return (
                    <div key={user.idcust}>
                        <span>{user.custname}</span>
                        <button
                            key={'button-edit'}
                            type="button"
                            onClick={() => {
                                handleEdit(user.idcust)
                            }}
                        >
                            📝
                        </button>
                        <button
                            key={'button-delete'}
                            type="button"
                            onClick={() => {
                                onDelete(user.idcust)
                            }}
                        >
                            🗑️
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default User
