//
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../../../UK-kit/Button/Button'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import NotFoundPage from '../../NotFoundPage/NotFoundPage'
import * as Api from '../../../Api/ApiAdmin'
import './ModerationAdmin.css'

function ModerationAdminPage() {
    const currentUser = React.useContext(CurrentUserContext)
    const [allUnModeratedItems, setAllUnModeratedItems] = React.useState([])

    if (currentUser.email !== process.env.REACT_APP_ADMIN) {
        return <NotFoundPage></NotFoundPage>
    }

    async function getAllItemsAdmin(page = 1, limit = 20) {
        page = 1
        limit = 50
        try {
          const res = await Api.getAllItemsAdmin({ page, limit });
          setAllUnModeratedItems(res.result)
        } catch (err) {
          console.log(err);
        }
    }

    async function updateModeratedAdmin(item_id, moderated) {
      try {
        const res = await Api.updateModeratedAdmin(item_id, moderated);
    
        if (res && res.item) {
          setAllUnModeratedItems((prev) =>
            prev.filter((item) => item.item_id !== item_id)
          );
        }
      } catch (err) {
        console.error("Ошибка при обновлении:", err);
      }
    }

    return(
        <>
            <h1 className='page-title'>Модерация page</h1>
            <Button onClick={getAllItemsAdmin}>Посмотреть что есть на модерации</Button>
            <p>Тут я планирую просмотр и удалние объявлений, модерация</p>
            <p>для этого нужно</p>
            <ul>
                <li>создать поле пройдено модерацию изначально фолс добавлено</li>
                <li>создать апи на изменение статуса модерации добавлено</li>
                <li>изменить все функции фильтрации и отдачи айтемов(только тех которые с модерацией тру) добавлено</li>
                <li>при выводе айтема делать проверку на прошел ли модерацию, если нет писать что модерация не пройдена </li>
                <li>изменить текст саксес попапа- объявление будет добавленоб после прохождения модерации</li>
                <li>на стр мои объявления показывать только где модерация пройдена - тру и сосздать знопку, показать объявления на модерации 
                    присылать ли сообщение не пройдена модерация - причина
                </li>
                <li>на стр модерации добавить ф-ции изменения модерация с фолс на тру</li>
                <li>изменить правила добавления объявлений на сайт добавить про модерацию</li>
            </ul>

            <ul className='ModerationAdminPage__container'>
                {allUnModeratedItems?.map((i) => (
                    <li key={i.item_id} className='ModerationAdminPage__card'>

                        <Button className='ModerationAdminPage__consent-btn' onClick={() => updateModeratedAdmin(i.item_id, true)}>Одобрить</Button>

                        <p className='ModerationAdminPage__string'>{i.title}</p>
                        <p className='ModerationAdminPage__string'>category_id: {i.category_id}</p>
                        
                        <p className='ModerationAdminPage__string'>description: {i.description}</p>
                        <p className='ModerationAdminPage__string'>images:</p>
                        {i.images? 
                        <div className="ModerationAdminPage__img-container">
                          {i.images.map((img, index) => (
                            <img className="oneAdd__main-pic" alt = {i.title} src={img} key={index}></img>
                          ))}
                        </div>
                        
                        : 
                        <></>
                        }

                        <Button className='ModerationAdminPage__no-consent-btn'>Написать комментарии и не одобрять</Button>
                    </li>
                ))}
            </ul>

        </>

    )
}

export default ModerationAdminPage;