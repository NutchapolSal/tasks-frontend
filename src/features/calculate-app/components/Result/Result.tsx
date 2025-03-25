import { FC } from 'react'

export interface Calculation {
    id: string
    count: number
    operator: string
    count2: number
    output: number
    removed: boolean
}

const Result: FC<{
    calcs: Calculation[]
    buttonText: string
    callback: (id: string) => void
}> = ({ calcs, buttonText, callback }) => {
    return (
        <ul>
            {calcs.map(({ id, count, operator, count2, output }) => (
                <li key={id}>
                    {count} {operator} {count2} = {output}
                    <button
                        onClick={() => {
                            callback(id)
                        }}
                        aria-label={`${buttonText} result ${output}`}
                    >
                        {` ${buttonText} `}
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default Result
