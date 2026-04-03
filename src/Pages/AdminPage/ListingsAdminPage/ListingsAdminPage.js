//
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../../../UK-kit/Button/Button'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import NotFoundPage from '../../NotFoundPage/NotFoundPage'
import * as Api from '../../../Api/Api'

function ListingsAdminPage() {
    const currentUser = React.useContext(CurrentUserContext)
    const [message, setMessage] = React.useState('')

    if (currentUser.email !== process.env.REACT_APP_ADMIN) {
        return <NotFoundPage></NotFoundPage>
    }

    async function handleUpdateTitleOnThreelang() {
            setMessage("")
            try {
              const result = await Api.updateItemTitle(
                127, 
                "Оригинальная живопись 80*80 см",
                "Оригинальная живопись 80*80 см",
                "Original painting 80*80 cm",
                'ציור מקורי 80*80 ס"מ'
              );
              setMessage("Изменение прошло")
            } catch (err) {
              console.error(err);
              setMessage("что-то пошло не так")
            }
          
    }

    function onUpdateTitleOnThreelang() {
        handleUpdateTitleOnThreelang()
    }

    return(
        <>
            <h1 className='page-title'>Объявления page</h1>
            <Button onClick={onUpdateTitleOnThreelang}>Изменить название объявления</Button>
            <p>{message}</p>
            <p>удаление уже добавленных и пройденных модерацию объявлений</p>
        </>

    )
}

export default ListingsAdminPage;