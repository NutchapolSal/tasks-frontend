import { useFormik } from 'formik'
import { If, UserType } from '../../../../utils/types'

interface UserFormProps<B extends boolean> {
    user: If<B, UserType>
    onSubmit: (user: If<B, UserType, Omit<UserType, 'idcust'>>) => void
    onCancel: () => void
}

function hasUser(ufp: UserFormProps<boolean>): ufp is UserFormProps<true> {
    return ufp.user != null
}

function hasNoUser(ufp: UserFormProps<boolean>): ufp is UserFormProps<false> {
    return ufp.user == null
}

const UserForm = <B extends boolean>(ufp: UserFormProps<B>) => {
    const editFormik = useFormik({
        initialValues: {
            custname: ufp.user?.custname ?? '',
            sex: ufp.user?.sex ?? '',
            address: ufp.user?.address ?? '',
            tel: ufp.user?.tel ?? '',
        },
        onSubmit: (values) => {
            if (hasUser(ufp)) {
                ufp.onSubmit({ ...values, idcust: ufp.user.idcust })
            } else if (hasNoUser(ufp)) {
                ufp.onSubmit({ ...values })
            }
        },
    })

    return (
        <div>
            <form onSubmit={editFormik.handleSubmit}>
                <input type="text" {...editFormik.getFieldProps('custname')} />
                <input type="text" {...editFormik.getFieldProps('sex')} />
                <input type="text" {...editFormik.getFieldProps('address')} />
                <input type="text" {...editFormik.getFieldProps('tel')} />
                <button key={'button-save'} type="submit">
                    💾
                </button>
                <button
                    key={'button-cancel'}
                    type="button"
                    onClick={() => {
                        editFormik.resetForm()
                        ufp.onCancel()
                    }}
                >
                    ❌
                </button>
            </form>
        </div>
    )
}

export default UserForm
