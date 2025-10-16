import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../UK-kit/Button/Button'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import Container from '../../UK-kit/Container/Container'
import './AdminPage.css'

function AdminPage() {
    const currentUser = React.useContext(CurrentUserContext)

    if (currentUser.email !== process.env.REACT_APP_ADMIN) {
        return <NotFoundPage></NotFoundPage>
    }

    return(
        <Container as='section' baseClassName='wrapper'>
        <Container as='div' baseClassName='container' className='admin__container'>
            <h1 className='page-title'>Admin page</h1>

            <div className='admin__btn-container'>
                <Button as={Link} to="/category-admin">
                    Категории
                </Button>
                <Button as={Link} to="/clients-admin">
                    Клиенты
                </Button>
                <Button as={Link} to="/listings-admin">
                    Объявления
                </Button>
                <Button as={Link} to="/add-new-ads-as-admin">
                    Модерация
                </Button>
                <Button as={Link} to="/items-admin-page">
                    Посмотреть удаленные объявления
                </Button>
            </div>
        </Container>
        </Container>

    )
}

export default AdminPage;