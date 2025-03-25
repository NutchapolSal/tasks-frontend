import { FC, useState } from 'react'
import { Calculation } from '../Result'

export interface FormProps {
    outputHandler: (calc: Calculation) => void
}

const Form: FC<FormProps> = ({ outputHandler }) => {
    const [count, setCount] = useState('0')
    const [count2, setCount2] = useState('0')
    const [operator, setOperator] = useState('+')
    const [output, setOutput] = useState(0)

    const buttonHandler = () => {
        const c = parseInt(count)
        const c2 = parseInt(count2)
        let output = 0
        switch (operator) {
            case '+':
                output = c + c2
                break
            case '-':
                output = c - c2
                break
            case '*':
                output = c * c2
                break
            case '/':
                output = c / c2
                break
            default:
                console.error('Invalid operator')
                return
        }

        setOutput(output)
        outputHandler({
            id: crypto.randomUUID(),
            count: c,
            operator,
            count2: c2,
            output,
            removed: false,
        })
    }

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        const { value } = event.target
        setCount(value)
    }
    const onChange2Handler: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        const { value } = event.target
        setCount2(value)
    }
    const onChangeOperatorHandler: React.ChangeEventHandler<
        HTMLSelectElement
    > = (event) => {
        const { value } = event.target
        setOperator(value)
    }

    return (
        <div>
            <input
                type="text"
                onChange={onChangeHandler}
                value={count}
                aria-label="input1"
            />
            <select
                onChange={onChangeOperatorHandler}
                value={operator}
                aria-label="select operator"
            >
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
            <input
                type="text"
                onChange={onChange2Handler}
                value={count2}
                aria-label="input2"
            />
            <button onClick={buttonHandler} aria-label="calculate button">
                output is {output}
            </button>
        </div>
    )
}

export default Form
