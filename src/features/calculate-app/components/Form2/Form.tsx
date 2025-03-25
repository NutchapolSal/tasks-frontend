import { FC, useState } from 'react'
import { Calculation } from '../Result'
import { useFormik } from 'formik'
import * as yup from 'yup'

export interface FormProps {
    outputHandler: (calc: Calculation) => void
}

const Form: FC<FormProps> = ({ outputHandler }) => {
    const formik = useFormik({
        initialValues: {
            count: '0',
            count2: '0',
            operator: '+',
        },
        validationSchema: yup.object({
            count: yup.string().required('Count 1 is required'),
            count2: yup.string().required('Count 2 is required'),
            operator: yup.string().required('Operator is required'),
        }),
        // onSubmit: () => {
        onSubmit: (values) => {
            const c = parseInt(values.count)
            const c2 = parseInt(values.count2)
            // const c = values.count
            // const c2 = values.count2
            let output = 0
            switch (values.operator) {
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
                operator: values.operator,
                count2: c2,
                output,
                removed: false,
            })
        },
    })

    const [output, setOutput] = useState(0)

    const isAnyError =
        formik.errors.count || formik.errors.count2 || formik.errors.operator

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.count}
                name="count"
                aria-label="count"
            />
            <select
                aria-label="select operator"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.operator}
                name="operator"
            >
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
            <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.count2}
                name="count2"
                aria-label="count2"
            />
            <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                aria-label="calculate button"
            >
                output is {output}
            </button>
            {isAnyError && (
                <div>
                    {formik.errors.count && <div>{formik.errors.count}</div>}
                    {formik.errors.count2 && <div>{formik.errors.count2}</div>}
                    {formik.errors.operator && (
                        <div>{formik.errors.operator}</div>
                    )}
                </div>
            )}
        </form>
    )
}

export default Form
