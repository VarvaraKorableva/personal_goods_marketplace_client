import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../../UK-kit/Button/Button'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

function AdminPage() {
    const currentUser = React.useContext(CurrentUserContext)

    if (currentUser.email !== process.env.REACT_APP_ADMIN) {
        return <NotFoundPage></NotFoundPage>
    }

    return(
        <>
            <h1 className='page-title'>Admin page</h1>

            <div>
                <Button as={Link} to="/category-admin">
                    Категории
                </Button>
                <Button as={Link} to="/clients-admin">
                    Клиенты
                </Button>
            </div>
        </>

    )
}

export default AdminPage;