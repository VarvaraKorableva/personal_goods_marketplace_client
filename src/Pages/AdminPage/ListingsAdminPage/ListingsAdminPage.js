//
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../../../UK-kit/Button/Button'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import NotFoundPage from '../../NotFoundPage/NotFoundPage'

function ListingsAdminPage() {
    const currentUser = React.useContext(CurrentUserContext)

    if (currentUser.email !== process.env.REACT_APP_ADMIN) {
        return <NotFoundPage></NotFoundPage>
    }

    return(
        <>
            <h1 className='page-title'>Объявления page</h1>
            <p>удаление уже добавленных и пройденных модерацию объявлений</p>
        </>

    )
}

export default ListingsAdminPage;