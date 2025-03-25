import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Result, {
    Calculation,
} from './features/calculate-app/components/Result/Result'
import Form, { FormProps } from './features/calculate-app/components/Form2'
import axiosInstance from './utils/axios'
import { UserType } from './utils/types'
import User from './features/user-app/components/User/User'

function App() {
    const [history, setHistory] = useState<Calculation[]>([])

    const [users, setUsers] = useState<UserType[]>([])

    const getUsers = async () => {
        try {
            const response = await axiosInstance.get('/users')
            console.log(response)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users)
        })
    }, [])

    const userCreateHandler = (u: Omit<UserType, 'idcust'>) => {
        axiosInstance
            .post(`/users`, u)
            .then((response) => {
                setUsers((prev) => [...prev, response.data])
            })
            .catch(console.error)
    }

    const userUpdateHandler = (u: UserType) => {
        axiosInstance
            .put(`/users`, u)
            .then(() => {
                setUsers((prev) =>
                    prev.map((user) => (user.idcust === u.idcust ? u : user))
                )
            })
            .catch(console.error)
    }

    const userDeleteHandler = (id: number) => {
        axiosInstance
            .delete(`/users/${id}`)
            .then(() => {
                setUsers((prev) => prev.filter((user) => user.idcust !== id))
            })
            .catch(console.error)
    }

    const formOutputHandler: FormProps['outputHandler'] = (calc) => {
        setHistory([...history, calc])
    }

    const deleteButtonHandler = (id: string) => {
        setHistory(
            history.map((h) => {
                if (h.id === id) {
                    return { ...h, removed: true }
                }
                return h
            })
        )
    }

    const restoreButtonHandler = (id: string) => {
        setHistory(
            history.map((h) => {
                if (h.id === id) {
                    return { ...h, removed: false }
                }
                return h
            })
        )
    }

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <Form outputHandler={formOutputHandler}></Form>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
                <Result
                    calcs={history.filter((h) => !h.removed)}
                    buttonText="🗑️"
                    callback={deleteButtonHandler}
                />
                <Result
                    calcs={history.filter((h) => h.removed)}
                    buttonText="🔄"
                    callback={restoreButtonHandler}
                />
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <div>
                <User
                    users={users}
                    onCreate={userCreateHandler}
                    onUpdate={userUpdateHandler}
                    onDelete={userDeleteHandler}
                />
            </div>
        </>
    )
}

export default App
